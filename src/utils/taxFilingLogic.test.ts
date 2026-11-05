import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHATSAPP_NUMBER,
  BUSINESS_EMAIL,
  SERVICES_CATALOG,
  COMPLIANCE_CALENDAR_ITEMS,
  COMPLIANCE_MONTHS_DATA,
  calculateLateFeeAndInterest,
  getDocumentChecklist,
  generateICSContent,
  generateGoogleCalendarUrl,
  validateIndianMobile,
  validateEmail,
  validateLeadForm,
  generateWhatsAppUrl,
  generateCalendarWhatsAppUrl,
  generateMailtoUrl,
  FAQ_DATA,
  getFaqItems,
  inspectEmailAddress,
  generateEmailOtp,
  verifyEmailOtp,
  resolveThemePreference,
  getNextTheme,
  THEME_PALETTES,
} from './taxFilingLogic.js';

test('business details match user requirements', () => {
  assert.equal(WHATSAPP_NUMBER, '919667970515');
  assert.equal(BUSINESS_EMAIL, 'contactforkunal@gmail.com');
});

test('services catalog has all 12 services cleanly categorized without pricing', () => {
  assert.equal(SERVICES_CATALOG.length, 12);
  const gstFiling = SERVICES_CATALOG.find(s => s.name === 'GST Return Filing');
  assert.ok(gstFiling);
  assert.equal(gstFiling?.category, 'gst');
  assert.equal(gstFiling?.categoryLabel, 'GST Returns');

  const itr = SERVICES_CATALOG.find(s => s.name === 'Income Tax Return Filing');
  assert.ok(itr);
  assert.equal(itr?.category, 'itr');

  const tdsFiling = SERVICES_CATALOG.find(s => s.name === 'TDS Return Filing');
  assert.ok(tdsFiling);
  assert.equal(tdsFiling?.category, 'tds');
});

test('compliance calendar has upcoming statutory deadlines for the month', () => {
  assert.ok(COMPLIANCE_CALENDAR_ITEMS.length >= 8);
  const gstr1 = COMPLIANCE_CALENDAR_ITEMS.find(c => c.id === 'cal-gstr1');
  assert.ok(gstr1);
  assert.equal(gstr1?.dueDay, 11);
  assert.equal(gstr1?.title, 'GSTR-1 Monthly Return');
  assert.equal(gstr1?.statusBadge, 'priority');

  const gstr3b = COMPLIANCE_CALENDAR_ITEMS.find(c => c.id === 'cal-gstr3b');
  assert.ok(gstr3b);
  assert.equal(gstr3b?.dueDay, 20);

  const tds = COMPLIANCE_CALENDAR_ITEMS.find(c => c.id === 'cal-tds-deposit');
  assert.ok(tds);
  assert.equal(tds?.dueDay, 7);
});

test('generateCalendarWhatsAppUrl creates correct reminder link', () => {
  const gstr1 = COMPLIANCE_CALENDAR_ITEMS.find(c => c.id === 'cal-gstr1')!;
  const url = generateCalendarWhatsAppUrl(gstr1);
  assert.ok(url.startsWith('https://wa.me/919667970515?text='));
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('GSTR-1 Monthly Return'));
  assert.ok(decoded.includes('11th'));
});

test('validateIndianMobile accepts valid 10-digit formats', () => {
  assert.deepEqual(validateIndianMobile('9876543210'), { isValid: true, normalized: '9876543210' });
  assert.deepEqual(validateIndianMobile('+91 98765 43210'), { isValid: true, normalized: '9876543210' });
  assert.deepEqual(validateIndianMobile('09876543210'), { isValid: true, normalized: '9876543210' });
  assert.deepEqual(validateIndianMobile('919667970515'), { isValid: true, normalized: '9667970515' });
});

test('validateIndianMobile rejects invalid numbers', () => {
  assert.equal(validateIndianMobile('1234567890').isValid, false);
  assert.equal(validateIndianMobile('98765').isValid, false);
  assert.equal(validateIndianMobile('').isValid, false);
});

test('validateEmail handles valid and invalid emails', () => {
  assert.equal(validateEmail('test@example.com').isValid, true);
  assert.equal(validateEmail('contactforkunal@gmail.com').isValid, true);
  assert.equal(validateEmail('invalid-email').isValid, false);
  assert.equal(validateEmail('').isValid, false);
});

test('validateLeadForm validates fields and produces clean normalized output', () => {
  const invalid = validateLeadForm({
    fullName: '',
    mobileNumber: '123',
    emailAddress: 'bad',
    serviceRequired: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.mobileNumber);
  assert.ok(invalid.errors.emailAddress);
  assert.ok(invalid.errors.serviceRequired);

  const valid = validateLeadForm({
    fullName: 'Rahul Sharma',
    mobileNumber: '+91 9876543210',
    emailAddress: 'rahul@example.com',
    businessName: 'Sharma Enterprises',
    serviceRequired: 'GST Return Filing',
    message: 'Need help with GSTR-3B backlog',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.normalizedData?.mobileNumber, '9876543210');
  assert.equal(valid.normalizedData?.fullName, 'Rahul Sharma');
});

test('generateWhatsAppUrl builds compliant deep-links without pricing', () => {
  const defaultUrl = generateWhatsAppUrl({});
  assert.ok(defaultUrl.startsWith('https://wa.me/919667970515?text='));
  assert.ok(decodeURIComponent(defaultUrl).includes('I visited your Tax Filing website'));

  const serviceUrl = generateWhatsAppUrl({ serviceName: 'GST Registration' });
  const decoded = decodeURIComponent(serviceUrl);
  assert.ok(decoded.includes('interested in GST Registration'));
  assert.ok(!decoded.includes('Maker Price'));
  assert.ok(!decoded.includes('₹'));

  const leadUrl = generateWhatsAppUrl({
    leadData: {
      fullName: 'Anita Roy',
      mobileNumber: '9876543210',
      emailAddress: 'anita@gmail.com',
      serviceRequired: 'Income Tax Return Filing',
    },
  });
  const decodedLead = decodeURIComponent(leadUrl);
  assert.ok(decodedLead.includes('Anita Roy'));
  assert.ok(decodedLead.includes('Income Tax Return Filing'));
  assert.ok(!decodedLead.includes('Maker Price'));
  assert.ok(!decodedLead.includes('₹'));
});

test('calculateLateFeeAndInterest correctly computes GSTR-3B late fees and interest', () => {
  // GSTR-3B Nil return 10 days delay: ₹20 * 10 = ₹200, 0 interest
  const nilRes = calculateLateFeeAndInterest({
    returnType: 'gstr3b',
    daysDelayed: 10,
    taxLiability: 0,
    isNilReturn: true,
  });
  assert.equal(nilRes.lateFee, 200);
  assert.equal(nilRes.interest, 0);
  assert.equal(nilRes.totalPayable, 200);

  // GSTR-3B Regular return with ₹50,000 tax liability delayed 30 days:
  // Late fee: ₹50 * 30 = ₹1,500
  // Interest: 50,000 * 0.18 * 30 / 365 = ₹740
  const regRes = calculateLateFeeAndInterest({
    returnType: 'gstr3b',
    daysDelayed: 30,
    taxLiability: 50000,
    isNilReturn: false,
  });
  assert.equal(regRes.lateFee, 1500);
  assert.equal(regRes.interest, 740);
  assert.equal(regRes.totalPayable, 2240);
});

test('calculateLateFeeAndInterest correctly computes TDS Challan 281 interest under Sec 201(1A)', () => {
  // TDS: ₹20,000 liability delayed 15 days (1 month part) @ 1.5% = ₹300
  const tdsRes = calculateLateFeeAndInterest({
    returnType: 'tds281',
    daysDelayed: 15,
    taxLiability: 20000,
    isNilReturn: false,
  });
  assert.equal(tdsRes.lateFee, 0);
  assert.equal(tdsRes.interest, 300);
  assert.equal(tdsRes.totalPayable, 300);
});

test('getDocumentChecklist returns organized requirements for entity and service', () => {
  const propGst = getDocumentChecklist('proprietorship', 'GST Registration');
  assert.ok(propGst);
  assert.equal(propGst?.entityType, 'proprietorship');
  assert.ok(propGst?.documents.some(d => d.title.includes('PAN Card')));
  assert.ok(propGst?.documents.some(d => d.title.includes('Electricity')));

  const itr = getDocumentChecklist('individual', 'Income Tax Return (ITR)');
  assert.ok(itr);
  assert.ok(itr?.documents.some(d => d.title.includes('Form 16')));
});

test('generateICSContent and generateGoogleCalendarUrl produce valid calendar artifacts', () => {
  const sample = COMPLIANCE_CALENDAR_ITEMS[0];
  const ics = generateICSContent(sample);
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('SUMMARY:Tax Due Date:'));
  assert.ok(ics.includes('END:VCALENDAR'));

  const gcalUrl = generateGoogleCalendarUrl(sample);
  assert.ok(gcalUrl.startsWith('https://calendar.google.com/calendar/render?action=TEMPLATE'));
  assert.ok(gcalUrl.includes('Tax%20Due%20Date%3A'));
});

test('COMPLIANCE_MONTHS_DATA provides valid multi-month schedules', () => {
  assert.ok(COMPLIANCE_MONTHS_DATA['nov-2026']);
  assert.ok(COMPLIANCE_MONTHS_DATA['dec-2026']);
  assert.ok(COMPLIANCE_MONTHS_DATA['jan-2027']);
  assert.ok(COMPLIANCE_MONTHS_DATA['dec-2026'].items.some(i => i.title.includes('Advance Tax')));
  assert.ok(COMPLIANCE_MONTHS_DATA['dec-2026'].items.some(i => i.title.includes('GSTR-9')));
});

test('FAQ_DATA provides comprehensive compliance answers and getFaqItems filters correctly', () => {
  assert.ok(FAQ_DATA.length >= 15);
  const gstFaq = getFaqItems('gst');
  assert.ok(gstFaq.length >= 4);
  assert.ok(gstFaq.some(f => f.question.includes('GST registration mandatory')));
  assert.ok(gstFaq.some(f => f.answer.includes('Nil Return') || f.question.includes('zero sales')));
  assert.ok(gstFaq.some(f => f.question.includes('QRMP')));
  assert.ok(gstFaq.some(f => f.question.includes('GSTR-2B')));

  const itrFaq = getFaqItems('itr');
  assert.ok(itrFaq.length >= 3);
  assert.ok(itrFaq.some(f => f.question.includes('Income Tax Return')));
  assert.ok(itrFaq.some(f => f.question.includes('Old and New Tax Regimes')));
  assert.ok(itrFaq.some(f => f.question.includes('Belated Return') || f.question.includes('July 31st')));

  const tdsFaq = getFaqItems('tds');
  assert.ok(tdsFaq.length >= 3);
  assert.ok(tdsFaq.some(f => f.question.includes('Form 16A')));
  assert.ok(tdsFaq.some(f => f.question.includes('Lower or Nil TDS')));

  const complianceFaq = getFaqItems('compliance');
  assert.ok(complianceFaq.some(f => f.question.includes('ROC')));

  const onboardingFaq = getFaqItems('onboarding');
  assert.ok(onboardingFaq.some(f => f.question.includes('confidential') || f.question.includes('safeguard')));

  const allFaq = getFaqItems('all');
  assert.equal(allFaq.length, FAQ_DATA.length);
});

test('inspectEmailAddress identifies valid, typo, disposable, and business domains', () => {
  // Consumer valid
  const gmailRes = inspectEmailAddress('kunal.tax@gmail.com');
  assert.equal(gmailRes.isValidFormat, true);
  assert.equal(gmailRes.isDisposable, false);
  assert.equal(gmailRes.isBusinessDomain, false);

  // Business domain
  const corpRes = inspectEmailAddress('finance@acmecorp.in');
  assert.equal(corpRes.isValidFormat, true);
  assert.equal(corpRes.isBusinessDomain, true);
  assert.equal(corpRes.isDisposable, false);

  // Typo detection
  const typoRes = inspectEmailAddress('director@gamil.com');
  assert.equal(typoRes.isValidFormat, true);
  assert.equal(typoRes.typoCorrection, 'director@gmail.com');
  assert.ok(typoRes.feedbackMessage?.includes('Did you mean director@gmail.com'));

  // Disposable domain rejection
  const dispRes = inspectEmailAddress('throwaway@tempmail.com');
  assert.equal(dispRes.isDisposable, true);
  assert.ok(dispRes.feedbackMessage?.includes('disposable'));

  // Invalid email format
  const badRes = inspectEmailAddress('not-an-email');
  assert.equal(badRes.isValidFormat, false);
});

test('generateEmailOtp and verifyEmailOtp handle full verification lifecycle', () => {
  const email = 'client@compliance.com';
  const session = generateEmailOtp(email, '482910');

  assert.equal(session.email, email);
  assert.equal(session.otpCode, '482910');
  assert.equal(session.isVerified, false);

  // Wrong code
  const wrongRes = verifyEmailOtp(session, '123456');
  assert.equal(wrongRes.isValid, false);
  assert.equal(session.isVerified, false);

  // Correct code
  const rightRes = verifyEmailOtp(session, '482910');
  assert.equal(rightRes.isValid, true);
  assert.equal(session.isVerified, true);

  // Expiration check
  const expiredSession = generateEmailOtp(email, '999888');
  const futureTime = Date.now() + 15 * 60 * 1000; // 15 mins later
  const expRes = verifyEmailOtp(expiredSession, '999888', futureTime);
  assert.equal(expRes.isValid, false);
  assert.ok(expRes.message.includes('expired'));
});

test('generateWhatsAppUrl reflects email verified badge', () => {
  const urlUnverified = generateWhatsAppUrl({
    leadData: {
      fullName: 'Rahul Verma',
      mobileNumber: '9876543210',
      emailAddress: 'rahul@verma.com',
      serviceRequired: 'GST Registration',
      isEmailVerified: false,
    },
  });
  assert.ok(!urlUnverified.includes('(Verified%20%E2%9C%93)'));

  const urlVerified = generateWhatsAppUrl({
    leadData: {
      fullName: 'Rahul Verma',
      mobileNumber: '9876543210',
      emailAddress: 'rahul@verma.com',
      serviceRequired: 'GST Registration',
      isEmailVerified: true,
    },
  });
  assert.ok(urlVerified.includes('(Verified%20%E2%9C%93)'));
});

test('resolveThemePreference handles stored preference, system fallback, and toggling', () => {
  // Stored preference overrides system setting
  assert.equal(resolveThemePreference('dark', false), 'dark');
  assert.equal(resolveThemePreference('light', true), 'light');

  // Fallback to system preference when no preference stored
  assert.equal(resolveThemePreference(null, true), 'dark');
  assert.equal(resolveThemePreference(null, false), 'light');
  assert.equal(resolveThemePreference(undefined, false), 'light');

  // getNextTheme correctly flips theme
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');

  // Verify palettes are properly defined
  assert.equal(THEME_PALETTES.light.bgSage, '#CBCFB8');
  assert.equal(THEME_PALETTES.dark.bgSage, '#111A15');
  assert.ok(THEME_PALETTES.dark.inkPrimary.startsWith('#'));
});


