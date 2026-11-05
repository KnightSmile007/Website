/**
 * Pure business logic, compliance calendar, and validation routines for Tax Filing
 */

export const WHATSAPP_NUMBER = "919667970515";
export const BUSINESS_EMAIL = "contactforkunal@gmail.com";

export interface ServiceItem {
  id: string;
  name: string;
  category: 'gst' | 'itr' | 'tds' | 'accounting' | 'corporate';
  description: string;
  categoryLabel: string;
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'gst-reg',
    name: 'GST Registration',
    category: 'gst',
    categoryLabel: 'GST Compliance',
    description: 'New GST registration and related assistance for proprietorships, partnerships, LLPs, and companies.',
  },
  {
    id: 'gst-filing',
    name: 'GST Return Filing',
    category: 'gst',
    categoryLabel: 'GST Returns',
    description: 'Timely, error-free filing of GSTR-1, GSTR-3B, GSTR-9, and other applicable returns.',
  },
  {
    id: 'gst-recon',
    name: 'GST Reconciliation',
    category: 'gst',
    categoryLabel: 'ITC Verification',
    description: 'Purchase reconciliation, input tax credit verification, and GSTR-2B matching to maximize eligible ITC.',
  },
  {
    id: 'itr-filing',
    name: 'Income Tax Return Filing',
    category: 'itr',
    categoryLabel: 'Direct Tax',
    description: 'ITR filing for salaried individuals, freelancers, professionals, business owners, and corporate entities.',
  },
  {
    id: 'tds-filing',
    name: 'TDS Return Filing',
    category: 'tds',
    categoryLabel: 'Quarterly TDS',
    description: 'Quarterly TDS return preparation and filing for 24Q, 26Q, 27Q, and Form 16/16A generation.',
  },
  {
    id: 'tds-comp',
    name: 'TDS Compliance',
    category: 'tds',
    categoryLabel: 'Withholding Tax',
    description: 'Precise TDS rate deductions, monthly challan deposits, correction statements, and regular compliance tracking.',
  },
  {
    id: 'accounting',
    name: 'Accounting & Bookkeeping',
    category: 'accounting',
    categoryLabel: 'Ledger & Accounts',
    description: 'Organised daily sales, purchase, expense entries, bank reconciliation, and general ledger maintenance.',
  },
  {
    id: 'biz-reg',
    name: 'Business Registration',
    category: 'corporate',
    categoryLabel: 'Entity Setup',
    description: 'Assistance with MSME/Udyam, Shop & Establishment, Partnership deeds, and business incorporations.',
  },
  {
    id: 'company-comp',
    name: 'Company Annual Compliance',
    category: 'corporate',
    categoryLabel: 'ROC Compliance',
    description: 'ROC annual return filings, director KYC (DIR-3 KYC), statutory board resolutions, and annual filings.',
  },
  {
    id: 'fin-statements',
    name: 'Financial Statements',
    category: 'accounting',
    categoryLabel: 'Financial Reporting',
    description: 'Preparation of Balance Sheets, Profit & Loss accounts, depreciation charts, and financial statements.',
  },
  {
    id: 'ecom-acc',
    name: 'E-commerce Accounting',
    category: 'accounting',
    categoryLabel: 'Marketplace Accounting',
    description: 'Amazon, Flipkart, Meesho, and custom marketplace sales reconciliation, TCS/TDS credits, and multi-state GST.',
  },
  {
    id: 'other-tax',
    name: 'Other Tax & Accounting Work',
    category: 'gst',
    categoryLabel: 'Advisory & Notice',
    description: 'Tailored assistance for specific compliance needs, tax notices, rectification filings, and bespoke bookkeeping.',
  },
];

export interface ComplianceCalendarItem {
  id: string;
  dueDay: number;
  monthName: string;
  year: number;
  title: string;
  category: 'gst' | 'tds' | 'payroll' | 'corporate';
  categoryLabel: string;
  applicableTo: string;
  formNumber: string;
  statusBadge: 'priority' | 'upcoming' | 'standard';
  penaltyNote: string;
}

export const COMPLIANCE_MONTHS_DATA: Record<string, { label: string; items: ComplianceCalendarItem[] }> = {
  'nov-2026': {
    label: 'November 2026',
    items: [
      {
        id: 'cal-tds-deposit',
        dueDay: 7,
        monthName: 'November',
        year: 2026,
        title: 'TDS / TCS Monthly Deposit',
        category: 'tds',
        categoryLabel: 'Direct Tax / TDS',
        applicableTo: 'All corporate & business deductors for October deductions',
        formNumber: 'Challan ITNS 281',
        statusBadge: 'upcoming',
        penaltyNote: 'Interest @ 1.5% per month on late deposit under Sec 201(1A)',
      },
      {
        id: 'cal-gstr7-8',
        dueDay: 10,
        monthName: 'November',
        year: 2026,
        title: 'GSTR-7 & GSTR-8 Filing',
        category: 'gst',
        categoryLabel: 'GST Compliance',
        applicableTo: 'E-commerce operators (TCS) and GST TDS deductors',
        formNumber: 'GSTR-7 / GSTR-8',
        statusBadge: 'standard',
        penaltyNote: 'Late fees of ₹50/day (₹20 for nil) under CGST Act',
      },
      {
        id: 'cal-gstr1',
        dueDay: 11,
        monthName: 'November',
        year: 2026,
        title: 'GSTR-1 Monthly Return',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'Regular taxpayers with turnover > ₹5 Cr or monthly filers',
        formNumber: 'GSTR-1 Statement',
        statusBadge: 'priority',
        penaltyNote: 'Affects B2B ITC in GSTR-2B; late fees ₹50/day applicable',
      },
      {
        id: 'cal-iff',
        dueDay: 13,
        monthName: 'November',
        year: 2026,
        title: 'Invoice Furnishing Facility (IFF)',
        category: 'gst',
        categoryLabel: 'GST QRMP',
        applicableTo: 'Small taxpayers opted into quarterly QRMP scheme',
        formNumber: 'IFF Portal Upload',
        statusBadge: 'standard',
        penaltyNote: 'Allows buyers to claim eligible ITC in current tax period',
      },
      {
        id: 'cal-pf-esi',
        dueDay: 15,
        monthName: 'November',
        year: 2026,
        title: 'PF & ESI Monthly Deposit',
        category: 'payroll',
        categoryLabel: 'Payroll & Labor',
        applicableTo: 'Establishments registered with EPFO & ESIC schemes',
        formNumber: 'ECR Electronic Challan',
        statusBadge: 'upcoming',
        penaltyNote: 'Disallowance of employer expense deduction if delayed',
      },
      {
        id: 'cal-gstr3b',
        dueDay: 20,
        monthName: 'November',
        year: 2026,
        title: 'GSTR-3B Monthly Return & Tax',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'All regular taxpayers filing monthly summary returns',
        formNumber: 'GSTR-3B Summary Return',
        statusBadge: 'priority',
        penaltyNote: 'Late fee ₹50/day + 18% p.a. interest on cash tax liability',
      },
      {
        id: 'cal-pmt06',
        dueDay: 25,
        monthName: 'November',
        year: 2026,
        title: 'PMT-06 GST Payment (QRMP)',
        category: 'gst',
        categoryLabel: 'GST QRMP',
        applicableTo: 'Quarterly return filers depositing monthly tax',
        formNumber: 'Challan PMT-06',
        statusBadge: 'standard',
        penaltyNote: 'Interest charged on shortfall from 21st until deposit',
      },
      {
        id: 'cal-roc-audit',
        dueDay: 30,
        monthName: 'November',
        year: 2026,
        title: 'ROC Filings & Tax Disclosures',
        category: 'corporate',
        categoryLabel: 'Corporate & Audit',
        applicableTo: 'Companies, LLPs & audit-eligible business entities',
        formNumber: 'Form AOC-4 / 3CEB Disclosures',
        statusBadge: 'upcoming',
        penaltyNote: 'Additional ROC filing fees up to ₹100/day under MCA rules',
      },
    ],
  },
  'dec-2026': {
    label: 'December 2026',
    items: [
      {
        id: 'dec-tds',
        dueDay: 7,
        monthName: 'December',
        year: 2026,
        title: 'TDS / TCS Monthly Deposit',
        category: 'tds',
        categoryLabel: 'Direct Tax / TDS',
        applicableTo: 'All deductors for tax withheld during November',
        formNumber: 'Challan ITNS 281',
        statusBadge: 'upcoming',
        penaltyNote: 'Interest @ 1.5% per month on late deposit',
      },
      {
        id: 'dec-gstr1',
        dueDay: 11,
        monthName: 'December',
        year: 2026,
        title: 'GSTR-1 Monthly Outward Supplies',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'Regular taxpayers filing monthly November sales',
        formNumber: 'GSTR-1 Statement',
        statusBadge: 'priority',
        penaltyNote: 'Late fee ₹50/day; buyers cannot claim timely ITC',
      },
      {
        id: 'dec-advtax',
        dueDay: 15,
        monthName: 'December',
        year: 2026,
        title: 'Advance Tax 3rd Installment (75%)',
        category: 'tds',
        categoryLabel: 'Direct Tax',
        applicableTo: 'All corporate & individual taxpayers with liability > ₹10k',
        formNumber: 'Challan ITNS 280',
        statusBadge: 'priority',
        penaltyNote: 'Mandatory 75% cumulative advance tax; Sec 234C interest applies',
      },
      {
        id: 'dec-pf-esi',
        dueDay: 15,
        monthName: 'December',
        year: 2026,
        title: 'PF & ESIC Statutory Deposit',
        category: 'payroll',
        categoryLabel: 'Payroll & Labor',
        applicableTo: 'Establishments with registered employee payrolls',
        formNumber: 'ECR Portal Challan',
        statusBadge: 'standard',
        penaltyNote: 'Delay invites late interest and employer disallowance',
      },
      {
        id: 'dec-gstr3b',
        dueDay: 20,
        monthName: 'December',
        year: 2026,
        title: 'GSTR-3B Monthly Tax Settlement',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'Regular taxpayers for November 2026 supplies',
        formNumber: 'GSTR-3B Summary Return',
        statusBadge: 'priority',
        penaltyNote: 'Late fee ₹50/day + 18% p.a. interest on cash liability',
      },
      {
        id: 'dec-gstr9',
        dueDay: 31,
        monthName: 'December',
        year: 2026,
        title: 'GSTR-9 & 9C Annual GST Returns',
        category: 'gst',
        categoryLabel: 'GST Annual Return',
        applicableTo: 'Annual return for registered taxpayers and reconciliation',
        formNumber: 'Form GSTR-9 / 9C',
        statusBadge: 'priority',
        penaltyNote: 'Statutory late fee of ₹200/day under Section 47',
      },
    ],
  },
  'jan-2027': {
    label: 'January 2027',
    items: [
      {
        id: 'jan-tds',
        dueDay: 7,
        monthName: 'January',
        year: 2027,
        title: 'TDS / TCS Monthly Deposit',
        category: 'tds',
        categoryLabel: 'Direct Tax / TDS',
        applicableTo: 'Deductions made in December 2026',
        formNumber: 'Challan ITNS 281',
        statusBadge: 'upcoming',
        penaltyNote: 'Interest @ 1.5% per month on late deposit',
      },
      {
        id: 'jan-gstr1',
        dueDay: 11,
        monthName: 'January',
        year: 2027,
        title: 'GSTR-1 Monthly Return',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'Monthly filers for December outward supplies',
        formNumber: 'GSTR-1 Statement',
        statusBadge: 'priority',
        penaltyNote: 'Late fee ₹50/day applies on delayed submission',
      },
      {
        id: 'jan-gstr1-q3',
        dueDay: 13,
        monthName: 'January',
        year: 2027,
        title: 'Quarterly GSTR-1 (Q3 Oct-Dec)',
        category: 'gst',
        categoryLabel: 'GST QRMP',
        applicableTo: 'Small taxpayers opted under QRMP Scheme for Q3',
        formNumber: 'Quarterly GSTR-1',
        statusBadge: 'priority',
        penaltyNote: 'Critical for all trade buyers claiming Q3 input credit',
      },
      {
        id: 'jan-gstr3b-q3',
        dueDay: 22,
        monthName: 'January',
        year: 2027,
        title: 'Quarterly GSTR-3B (Q3 QRMP)',
        category: 'gst',
        categoryLabel: 'GST Returns',
        applicableTo: 'Quarterly return filers in Category 1 States',
        formNumber: 'GSTR-3B Quarterly',
        statusBadge: 'priority',
        penaltyNote: 'Final quarter 3 tax settlement & late fee safeguard',
      },
      {
        id: 'jan-tds-q3',
        dueDay: 31,
        monthName: 'January',
        year: 2027,
        title: 'Quarterly TDS Return (Q3 Oct-Dec)',
        category: 'tds',
        categoryLabel: 'Quarterly TDS',
        applicableTo: 'All deductors filing Form 24Q (Salary) & 26Q (Non-Salary)',
        formNumber: 'Form 24Q & 26Q',
        statusBadge: 'priority',
        penaltyNote: 'Late filing fee of ₹200 per day under Section 234E',
      },
    ],
  },
};

export const COMPLIANCE_CALENDAR_ITEMS: ComplianceCalendarItem[] = COMPLIANCE_MONTHS_DATA['nov-2026'].items;

/**
 * Late Fee and Interest Calculations
 */
export interface LateFeeCalculationInput {
  returnType: 'gstr3b' | 'gstr1' | 'tds281';
  daysDelayed: number;
  taxLiability: number;
  isNilReturn: boolean;
}

export interface LateFeeCalculationResult {
  returnType: string;
  daysDelayed: number;
  lateFee: number;
  interest: number;
  totalPayable: number;
  statutoryRule: string;
}

export function calculateLateFeeAndInterest(input: LateFeeCalculationInput): LateFeeCalculationResult {
  const days = Math.max(0, Math.floor(input.daysDelayed || 0));
  const liability = Math.max(0, Number(input.taxLiability) || 0);

  let lateFee = 0;
  let interest = 0;
  let statutoryRule = '';

  if (input.returnType === 'gstr3b') {
    // Under Section 47: ₹50/day (₹25 CGST + ₹25 SGST) or ₹20/day for Nil
    const perDay = input.isNilReturn ? 20 : 50;
    // Statutory max cap under amnesty / relief usually ₹500 (nil) or ₹2,000-₹10,000
    const maxCap = input.isNilReturn ? 500 : 10000;
    lateFee = Math.min(days * perDay, maxCap);

    // Section 50(1): 18% p.a. on net cash tax liability
    if (!input.isNilReturn && liability > 0 && days > 0) {
      interest = Math.round((liability * 0.18 * days) / 365);
    }
    statutoryRule = 'Section 47 (₹50/day or ₹20/day Nil) & Section 50(1) (18% p.a. interest)';
  } else if (input.returnType === 'gstr1') {
    // Under Section 47 for GSTR-1
    const perDay = input.isNilReturn ? 20 : 50;
    const maxCap = input.isNilReturn ? 500 : 10000;
    lateFee = Math.min(days * perDay, maxCap);
    // GSTR-1 has no tax liability interest directly in GSTR-1
    interest = 0;
    statutoryRule = 'Section 47 of CGST Act (₹50/day or ₹20/day Nil)';
  } else if (input.returnType === 'tds281') {
    // Section 201(1A): Interest @ 1.5% per month or part of month from date of deduction till deposit
    // No Section 47 late fee on challan deposit (late fee is on Form 24Q/26Q under 234E)
    lateFee = 0;
    if (liability > 0 && days > 0) {
      const months = Math.ceil(days / 30);
      interest = Math.round(liability * 0.015 * months);
    }
    statutoryRule = 'Section 201(1A) Interest @ 1.5% per month (or part) from deduction date';
  }

  return {
    returnType: input.returnType,
    daysDelayed: days,
    lateFee,
    interest,
    totalPayable: lateFee + interest,
    statutoryRule,
  };
}

/**
 * Entity & Service Document Checklist Catalog
 */
export interface DocumentChecklist {
  entityType: string;
  serviceName: string;
  documents: { title: string; desc: string; isMandatory: boolean }[];
  turnaroundTime: string;
}

export const DOCUMENT_CHECKLISTS: DocumentChecklist[] = [
  {
    entityType: 'proprietorship',
    serviceName: 'GST Registration',
    turnaroundTime: '2 - 4 Business Days',
    documents: [
      { title: 'PAN Card of Proprietor', desc: 'Self-attested clear copy of proprietor PAN card', isMandatory: true },
      { title: 'Aadhaar Card', desc: 'Linked with active mobile number for biometric OTP authentication', isMandatory: true },
      { title: 'Passport Photo', desc: 'Recent passport-sized photograph with plain background', isMandatory: true },
      { title: 'Electricity / Municipal Tax Bill', desc: 'Business premises electricity bill (not older than 60 days)', isMandatory: true },
      { title: 'Rent Agreement / NOC', desc: 'Rent agreement or NOC from property owner if rented', isMandatory: true },
      { title: 'Bank Proof', desc: 'Cancelled cheque or latest 1-month bank statement displaying IFSC & Name', isMandatory: true },
    ],
  },
  {
    entityType: 'company',
    serviceName: 'GST Registration',
    turnaroundTime: '3 - 5 Business Days',
    documents: [
      { title: 'Company PAN Card', desc: 'Certificate of Incorporation & Company PAN', isMandatory: true },
      { title: 'MOA & AOA', desc: 'Memorandum and Articles of Association', isMandatory: true },
      { title: 'Board Resolution / Authorisation Letter', desc: 'Resolution designating authorized signatory for GST portal', isMandatory: true },
      { title: 'Directors PAN & Aadhaar', desc: 'KYC proof for all active directors', isMandatory: true },
      { title: 'Registered Office Proof', desc: 'Electricity bill & NOC / Rent agreement of registered address', isMandatory: true },
      { title: 'Cancelled Cheque', desc: 'Company current bank account proof', isMandatory: true },
    ],
  },
  {
    entityType: 'individual',
    serviceName: 'Income Tax Return (ITR)',
    turnaroundTime: '24 - 48 Hours',
    documents: [
      { title: 'Form 16 / Salary Slips', desc: 'Form 16 provided by employer(s) for the assessment year', isMandatory: true },
      { title: 'Form 26AS & AIS / TIS', desc: 'Annual Information Statement downloaded from IT portal', isMandatory: true },
      { title: 'Bank Account Statements', desc: 'Savings / current account interest certificates for the fiscal year', isMandatory: true },
      { title: 'Tax Saving Proofs', desc: 'Life insurance (80C), Mediclaim (80D), NPS, tuition fees & home loan interest', isMandatory: false },
      { title: 'Capital Gains Statement', desc: 'Broking statement (Zerodha, Groww, etc.) for shares or mutual funds', isMandatory: false },
    ],
  },
  {
    entityType: 'business',
    serviceName: 'TDS Return Filing (24Q / 26Q)',
    turnaroundTime: '1 - 2 Business Days',
    documents: [
      { title: 'TAN Number Details', desc: 'Tax Deduction Account Number registration slip', isMandatory: true },
      { title: 'TDS Challan Receipts (BSR & Challan No)', desc: 'Challan ITNS 281 receipts paid for the quarter', isMandatory: true },
      { title: 'Deductee Details & PAN List', desc: 'PAN, invoice value, deduction section (194C, 194J, 194I, etc.)', isMandatory: true },
      { title: 'Salary Sheet (for 24Q)', desc: 'Quarterly gross salary breakdown and tax computed for employees', isMandatory: false },
    ],
  },
  {
    entityType: 'business',
    serviceName: 'Accounting & Bookkeeping Setup',
    turnaroundTime: 'Ongoing Monthly',
    documents: [
      { title: 'Bank Statements', desc: 'Full financial year bank statements in Excel or PDF format', isMandatory: true },
      { title: 'Sales & Outward Invoices', desc: 'Monthly sales register with GST breakdown', isMandatory: true },
      { title: 'Vendor Purchase Bills', desc: 'Expenses, inventory invoices & debit/credit notes', isMandatory: true },
      { title: 'Loan / Asset Documents', desc: 'EMI schedules and capital asset purchase receipts', isMandatory: false },
    ],
  },
];

export function getDocumentChecklist(entityType: string, serviceName: string): DocumentChecklist | undefined {
  return DOCUMENT_CHECKLISTS.find(
    (c) => c.entityType === entityType && c.serviceName.toLowerCase().includes(serviceName.toLowerCase())
  ) || DOCUMENT_CHECKLISTS[0];
}

/**
 * Generate iCalendar (.ics) string for calendar events
 */
export function generateICSContent(item: ComplianceCalendarItem): string {
  const pad = (n: number) => (n < 10 ? '0' + n : String(n));
  const monthMap: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const m = monthMap[item.monthName] || '11';
  const y = item.year;
  const d = pad(item.dueDay);

  const startStamp = `${y}${m}${d}T090000Z`;
  const endStamp = `${y}${m}${d}T180000Z`;
  const nowStamp = '20261105T120000Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tax Filing//Compliance Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:taxfiling-${item.id}-${y}${m}${d}@taxfiling.in`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART:${startStamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:Tax Due Date: ${item.title} (${item.formNumber})`,
    `DESCRIPTION:Statutory tax filing due date for ${item.title}. Applicable to: ${item.applicableTo}. Late note: ${item.penaltyNote}. Assistance: https://wa.me/919667970515`,
    'STATUS:CONFIRMED',
    'CATEGORIES:TAX,COMPLIANCE,BUSINESS',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Generate Google Calendar one-click link
 */
export function generateGoogleCalendarUrl(item: ComplianceCalendarItem): string {
  const pad = (n: number) => (n < 10 ? '0' + n : String(n));
  const monthMap: Record<string, string> = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const m = monthMap[item.monthName] || '11';
  const y = item.year;
  const d = pad(item.dueDay);

  const dates = `${y}${m}${d}T090000Z/${y}${m}${d}T180000Z`;
  const text = encodeURIComponent(`Tax Due Date: ${item.title} (${item.formNumber})`);
  const details = encodeURIComponent(
    `Statutory due date for ${item.title}.\nApplicable to: ${item.applicableTo}.\nNote: ${item.penaltyNote}.\nNeed assistance? Connect with Tax Filing team: https://wa.me/919667970515`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=India`;
}


/**
 * Email Verification & Domain Intelligence
 */
export interface EmailInspectionResult {
  isValidFormat: boolean;
  isDisposable: boolean;
  isBusinessDomain: boolean;
  domain: string;
  typoCorrection?: string;
  feedbackMessage?: string;
}

export const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'sharklasers.com',
  'getairmail.com',
  'dispostable.com',
  'yopmail.com',
  'fakeinbox.com',
  'trashmail.com',
  'burnermail.io',
  'mytemp.email',
]);

export const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  'gmil.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yaho.in': 'yahoo.in',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'rediffmal.com': 'rediffmail.com',
  'redifmail.com': 'rediffmail.com',
};

export const COMMON_CONSUMER_DOMAINS: ReadonlySet<string> = new Set([
  'gmail.com',
  'yahoo.com',
  'yahoo.co.in',
  'yahoo.in',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'rediffmail.com',
  'live.com',
  'msn.com',
]);

export function inspectEmailAddress(email: string): EmailInspectionResult {
  const trimmed = (email || '').trim().toLowerCase();
  if (!trimmed || !trimmed.includes('@')) {
    return {
      isValidFormat: false,
      isDisposable: false,
      isBusinessDomain: false,
      domain: '',
      feedbackMessage: 'Please enter a complete email address.',
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return {
      isValidFormat: false,
      isDisposable: false,
      isBusinessDomain: false,
      domain: '',
      feedbackMessage: 'Invalid email structure.',
    };
  }

  const localPart = parts[0];
  const domain = parts[1];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValidFormat: false,
      isDisposable: false,
      isBusinessDomain: false,
      domain,
      feedbackMessage: 'Please enter a valid email format (e.g. name@domain.com).',
    };
  }

  // Check common typos
  const typoSuggestion = COMMON_DOMAIN_TYPOS[domain];
  if (typoSuggestion) {
    return {
      isValidFormat: true,
      isDisposable: false,
      isBusinessDomain: false,
      domain,
      typoCorrection: `${localPart}@${typoSuggestion}`,
      feedbackMessage: `Did you mean ${localPart}@${typoSuggestion}?`,
    };
  }

  // Check disposable
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValidFormat: true,
      isDisposable: true,
      isBusinessDomain: false,
      domain,
      feedbackMessage: 'Temporary / disposable email addresses are not supported for statutory filing notifications.',
    };
  }

  const isConsumer = COMMON_CONSUMER_DOMAINS.has(domain);
  const isBusiness = !isConsumer && domain.includes('.');

  return {
    isValidFormat: true,
    isDisposable: false,
    isBusinessDomain: isBusiness,
    domain,
    feedbackMessage: isBusiness
      ? 'Corporate / business domain verified.'
      : 'Valid personal email address.',
  };
}

export interface VerificationSession {
  email: string;
  otpCode: string;
  createdAt: number;
  expiresAt: number;
  isVerified: boolean;
  attempts: number;
}

/**
 * Generates 6-digit verification code session
 */
export function generateEmailOtp(email: string, customCode?: string): VerificationSession {
  const cleanEmail = email.trim().toLowerCase();
  let code = customCode;
  if (!code) {
    code = String(Math.floor(100000 + Math.random() * 900000));
  }

  const now = Date.now();
  return {
    email: cleanEmail,
    otpCode: code,
    createdAt: now,
    expiresAt: now + 10 * 60 * 1000,
    isVerified: false,
    attempts: 0,
  };
}

/**
 * Validates entered OTP code against session
 */
export function verifyEmailOtp(
  session: VerificationSession | null | undefined,
  inputOtp: string,
  now = Date.now()
): { isValid: boolean; message: string } {
  if (!session) {
    return { isValid: false, message: 'No active verification session found. Please request a new code.' };
  }
  if (now > session.expiresAt) {
    return { isValid: false, message: 'Verification PIN has expired. Please request a fresh code.' };
  }
  if (session.attempts >= 5) {
    return { isValid: false, message: 'Maximum verification attempts exceeded. Please request a new code.' };
  }

  session.attempts += 1;
  const cleanInput = (inputOtp || '').trim().replace(/\s+/g, '');
  if (cleanInput === session.otpCode) {
    session.isVerified = true;
    return { isValid: true, message: 'Email address verified successfully.' };
  }

  return { isValid: false, message: 'Incorrect 6-digit verification PIN. Please check and try again.' };
}

export interface LeadFormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  businessName?: string;
  serviceRequired: string;
  message?: string;
  isEmailVerified?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  normalizedData?: LeadFormData;
}

/**
 * Validates Indian 10-digit mobile numbers with optional country code (+91, 91, or 0)
 */
export function validateIndianMobile(raw: string): { isValid: boolean; normalized: string; error?: string } {
  if (!raw || !raw.trim()) {
    return { isValid: false, normalized: '', error: 'Mobile number is required' };
  }
  const digits = raw.replace(/\D/g, '');

  let cleanDigits = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    cleanDigits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    cleanDigits = digits.slice(1);
  }

  if (cleanDigits.length !== 10) {
    return {
      isValid: false,
      normalized: cleanDigits,
      error: 'Please enter a valid 10-digit mobile number'
    };
  }

  if (!/^[6-9]/.test(cleanDigits)) {
    return {
      isValid: false,
      normalized: cleanDigits,
      error: 'Indian mobile numbers must begin with 6, 7, 8, or 9'
    };
  }

  return { isValid: true, normalized: cleanDigits };
}

/**
 * Validates standard email address format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
}

/**
 * Validates the entire lead capture form
 */
export function validateLeadForm(data: LeadFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters)';
  }

  const mobileValidation = validateIndianMobile(data.mobileNumber);
  if (!mobileValidation.isValid) {
    errors.mobileNumber = mobileValidation.error || 'Invalid mobile number';
  }

  const emailValidation = validateEmail(data.emailAddress);
  if (!emailValidation.isValid) {
    errors.emailAddress = emailValidation.error || 'Invalid email address';
  }

  if (!data.serviceRequired || !data.serviceRequired.trim()) {
    errors.serviceRequired = 'Please select a service';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
    normalizedData: isValid
      ? {
          ...data,
          fullName: data.fullName.trim(),
          mobileNumber: mobileValidation.normalized,
          emailAddress: data.emailAddress.trim(),
          businessName: data.businessName?.trim() || '',
          serviceRequired: data.serviceRequired.trim(),
          message: data.message?.trim() || '',
          isEmailVerified: Boolean(data.isEmailVerified),
        }
      : undefined,
  };
}

/**
 * Generates dynamic WhatsApp message and deep-link URL without pricing
 */
export function generateWhatsAppUrl(options: {
  serviceName?: string;
  leadData?: LeadFormData;
  customMessage?: string;
}): string {
  let text = '';

  if (options.leadData) {
    const d = options.leadData;
    text = [
      `Hello Tax Filing Team,`,
      `I would like to enquire about your compliance services:`,
      `• Name: ${d.fullName}`,
      `• Mobile: +91 ${d.mobileNumber}`,
      `• Email: ${d.emailAddress}${d.isEmailVerified ? ' (Verified ✓)' : ''}`,
      d.businessName ? `• Business: ${d.businessName}` : null,
      `• Service: ${d.serviceRequired}`,
      d.message ? `• Note: ${d.message}` : null,
      ``,
      `Please contact me regarding the process and professional onboarding. Thank you.`
    ]
      .filter(Boolean)
      .join('\n');
  } else if (options.serviceName) {
    text = `Hello Tax Filing Team, I am interested in ${options.serviceName}. Please contact me regarding the process and professional onboarding.`;
  } else if (options.customMessage) {
    text = options.customMessage;
  } else {
    text = 'Hello, I visited your Tax Filing website. I need assistance with GST and taxation services. Please share the details.';
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates calendar filing assistance WhatsApp URL
 */
export function generateCalendarWhatsAppUrl(item: { title: string; dueDay: number; monthName: string }): string {
  const text = `Hello Tax Filing Team, I need assistance with filing ${item.title} due on ${item.dueDay}th ${item.monthName}. Please guide me on required documents and timely filing.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates direct mailto link
 */
export function generateMailtoUrl(subject?: string, body?: string): string {
  const sub = subject ? encodeURIComponent(subject) : encodeURIComponent('Tax & Accounting Services Enquiry');
  const b = body ? encodeURIComponent(body) : encodeURIComponent('Hello Tax Filing Team,\n\nI need assistance with taxation services. Please share the details.\n\nThank you.');
  return `mailto:${BUSINESS_EMAIL}?subject=${sub}&body=${b}`;
}

/**
 * Frequently Asked Questions (FAQ) Data & Types
 */
export interface FAQItem {
  id: string;
  category: 'gst' | 'itr' | 'tds' | 'onboarding' | 'compliance';
  categoryLabel: string;
  question: string;
  answer: string;
  highlightNote?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-gst-reg',
    category: 'gst',
    categoryLabel: 'GST Compliance',
    question: 'When is GST registration mandatory for a new business in India?',
    answer: 'GST registration is statutory once annual turnover exceeds ₹40 Lakhs for goods suppliers (₹20 Lakhs in Special Category States) or ₹20 Lakhs for service providers (₹10 Lakhs in Special Category States). Furthermore, registration is mandatory irrespective of turnover for e-commerce sellers, interstate suppliers, and casual taxable persons.',
    highlightNote: 'Turnover limits: ₹40L (Goods) / ₹20L (Services) / Mandatory for E-commerce & Interstate trade.',
  },
  {
    id: 'faq-nil-return',
    category: 'gst',
    categoryLabel: 'GST Filing',
    question: 'Do I still need to file GST returns if my business had zero sales or purchases this month?',
    answer: 'Yes. Filing a Nil Return for both GSTR-1 and GSTR-3B is legally mandatory even during periods of zero business activity. Failing to file attracts a statutory late fee of ₹20 per day (₹10 CGST + ₹10 SGST) under Section 47, and prolonged non-filing can result in suspension or cancellation of your GSTIN.',
    highlightNote: 'Section 47 levies ₹20/day on Nil returns. Never leave a tax period unfiled.',
  },
  {
    id: 'faq-gst-qrmp',
    category: 'gst',
    categoryLabel: 'GST QRMP Scheme',
    question: 'What is the QRMP scheme in GST and who is eligible to opt for it?',
    answer: 'The Quarterly Return Monthly Payment (QRMP) scheme allows registered taxpayers with aggregate annual turnover up to ₹5 Crore to file GSTR-1 and GSTR-3B on a quarterly basis instead of monthly. However, tax liability must still be deposited monthly using Challan PMT-06 by the 25th of the month (via either the 35% Fixed Sum method or Self-Assessment method).',
    highlightNote: 'Eligibility: Turnover up to ₹5 Cr. File returns quarterly, deposit tax monthly via PMT-06.',
  },
  {
    id: 'faq-gst-itc-2b',
    category: 'gst',
    categoryLabel: 'ITC Reconciliation',
    question: 'Why can I only claim Input Tax Credit (ITC) that appears in GSTR-2B?',
    answer: 'Under Section 16(2)(aa) of the CGST Act, a buyer can only claim Input Tax Credit if the supplier has furnished invoice details in their GSTR-1 or IFF and the credit is reflected in the buyer\'s auto-generated GSTR-2B statement. Provisional ITC or unverified claims in GSTR-3B trigger automated demand notices from the GST system.',
    highlightNote: 'Section 16(2)(aa): 100% GSTR-2B matching is statutory for claiming valid ITC.',
  },
  {
    id: 'faq-itr-documents',
    category: 'itr',
    categoryLabel: 'Income Tax',
    question: 'Which documents are required for filing my Income Tax Return (ITR)?',
    answer: 'For salaried and individual taxpayers, primary documents include Form 16 from your employer, Annual Information Statement (AIS) and Form 26AS downloaded from the IT portal, bank account statements for the financial year, capital gains statements from broking accounts, and proof of tax deductions under Chapter VI-A (such as Section 80C, 80D, and NPS).',
    highlightNote: 'Quick turnarounds: 24 - 48 hours with Form 16, AIS/26AS and bank statements.',
  },
  {
    id: 'faq-itr-regimes',
    category: 'itr',
    categoryLabel: 'Tax Planning',
    question: 'How do I choose between the Old and New Tax Regimes when filing my ITR?',
    answer: 'The New Tax Regime under Section 115BAC is the default regime with lower tax slab rates, a ₹75,000 standard deduction, and full tax rebate up to ₹7 Lakhs taxable income, but it restricts Chapter VI-A deductions (80C, 80D, HRA). The Old Tax Regime remains advantageous if your total eligible deductions and housing loan interest exceed approximately ₹3.75 - ₹4 Lakhs. We compute both side-by-side to minimize your tax liability legally.',
    highlightNote: 'Default New Regime rebate up to ₹7L. We run a comparative computation for maximum savings.',
  },
  {
    id: 'faq-itr-belated',
    category: 'itr',
    categoryLabel: 'Direct Tax Deadlines',
    question: 'What happens if I miss the standard July 31st ITR filing deadline?',
    answer: 'If you miss the initial deadline, you can file a Belated Return under Section 139(4) up until December 31st of the assessment year. A statutory late fee under Section 234F applies (₹5,000, or ₹1,000 if total income is below ₹5 Lakhs), alongside 1% per month interest under Section 234A on unpaid tax. Furthermore, losses from business or capital assets (other than house property) cannot be carried forward.',
    highlightNote: 'Section 234F late fee applies up to Dec 31st. Unfiled returns cannot carry forward losses.',
  },
  {
    id: 'faq-tds-challan',
    category: 'tds',
    categoryLabel: 'TDS & Withholding',
    question: 'What is the consequence of depositing TDS after the 7th of the month?',
    answer: 'TDS deducted during any calendar month must be deposited into the government account via Challan ITNS 281 on or before the 7th of the subsequent month. Delaying payment attracts mandatory penal interest under Section 201(1A) at 1.5% per month (or part of a month) from the actual date of deduction until the deposit date.',
    highlightNote: 'Section 201(1A): 1.5% interest per month on delayed TDS challan deposits.',
  },
  {
    id: 'faq-tds-16a',
    category: 'tds',
    categoryLabel: 'TDS Certificates',
    question: 'What is Form 16A and when should I request it from my clients or bank?',
    answer: 'While Form 16 is an annual salary TDS certificate from an employer, Form 16A is a quarterly TDS certificate issued for non-salary payments, including professional fees (Section 194J), contract payments (Section 194C), rent (Section 194I), and bank fixed deposit interest (Section 194A). Deductors must issue Form 16A within 15 days of filing their quarterly TDS returns.',
    highlightNote: 'Form 16A covers non-salary TDS deductions and must reconcile with Form 26AS.',
  },
  {
    id: 'faq-tds-form13',
    category: 'tds',
    categoryLabel: 'Lower Deduction',
    question: 'Can I obtain a Lower or Nil TDS Deduction Certificate from the tax department?',
    answer: 'Yes. Under Section 197 of the Income Tax Act, taxpayers who anticipate a low or nil total tax liability (due to carry-forward losses or high allowable business expenses) can apply online via Form 13 on TRACES for a Lower or Nil TDS deduction certificate. Once granted by the Assessing Officer, deductors must deduct TDS at the reduced rate specified in the certificate.',
    highlightNote: 'Section 197 application via Form 13 on TRACES prevents excessive working capital blockage.',
  },
  {
    id: 'faq-onboarding-process',
    category: 'onboarding',
    categoryLabel: 'Client Onboarding',
    question: 'How does your remote onboarding process work and how do I send documents?',
    answer: 'Our onboarding process is 100% digital and client-friendly. Simply choose your service or connect with us on WhatsApp (+91 9667970515) or email. You will receive a tailored document checklist, after which you can share PDF or scanned copies over encrypted channels. Our team inspects every document for portal formatting and legal completeness before proceeding.',
    highlightNote: '100% paperless, rapid onboarding with direct WhatsApp consultant assistance.',
  },
  {
    id: 'faq-data-security',
    category: 'onboarding',
    categoryLabel: 'Confidentiality & Privacy',
    question: 'How do you safeguard client confidential documents, bank statements, and portal passwords?',
    answer: 'Client confidentiality is foundational to our practice. All client records, GSTIN credentials, and financial spreadsheets are handled with strict privacy protocols and used solely for lawful portal submissions and reconciliations. We never share, monetize, or expose client documents to third parties, and credentials can be updated immediately post-filing.',
    highlightNote: 'Strict end-to-end data confidentiality, NDAs available on request, and zero data sharing.',
  },
  {
    id: 'faq-notice-support',
    category: 'compliance',
    categoryLabel: 'Tax Advisory',
    question: 'Can you help if I have received a notice or discrepancy letter from the GST or Income Tax Department?',
    answer: 'Yes. We specialize in handling GST ASMT-10 notices, GSTR-1 vs GSTR-3B variance letters, GSTR-2B input credit mismatch notices, and Section 143(1) intimation / defect notices from the Income Tax department. We prepare formal reconciliation statements, draft legal replies, and submit rectification requests on the statutory portals.',
    highlightNote: 'Notice drafting, GSTR-2B input tax credit reconciliation, and portal filings.',
  },
  {
    id: 'faq-audit-requirement',
    category: 'compliance',
    categoryLabel: 'Audit & Accounts',
    question: 'What are the turnover limits for Tax Audit under Section 44AB?',
    answer: 'Under Section 44AB of the Income Tax Act, tax audit is mandatory for businesses having gross turnover exceeding ₹1 Crore (or ₹10 Crore if digital/cash transactions are under 5%). For professionals (freelancers, doctors, architects, consultants), tax audit applies if gross receipts exceed ₹50 Lakhs (or ₹75 Lakhs under presumptive Section 44ADA subject to 95% digital receipts).',
    highlightNote: 'Business: ₹1 Cr / ₹10 Cr (95% digital). Professionals: ₹50L / ₹75L (digital).',
  },
  {
    id: 'faq-roc-compliance',
    category: 'compliance',
    categoryLabel: 'Corporate Compliance',
    question: 'What are the mandatory annual ROC filings for a Private Limited Company or OPC?',
    answer: 'Every registered Indian Private Limited Company and One Person Company (OPC) must complete mandatory annual compliances with the Registrar of Companies (ROC), including Form AOC-4 (Financial Statements), Form MGT-7/MGT-7A (Annual Return), and annual DIR-3 KYC verification for all active directors. Failure to file incurs a heavy recurring penalty of ₹100 per day per form with no maximum limit.',
    highlightNote: 'AOC-4, MGT-7 and DIR-3 KYC. Avoid ₹100/day ongoing statutory default penalties.',
  },
];

export function getFaqItems(category?: string): FAQItem[] {
  if (!category || category === 'all') {
    return FAQ_DATA;
  }
  return FAQ_DATA.filter((item) => item.category === category);
}

/**
 * Editorial Theme (Light / Dark) Configuration & Persistence
 */
export const THEME_STORAGE_KEY = 'taxfiling_theme';

export type EditorialTheme = 'light' | 'dark';

export interface ThemePalette {
  bgSage: string;
  inkPrimary: string;
  inkSecondary: string;
  accentOlive: string;
  glassBg: string;
  glassBorder: string;
  btnPrimary: string;
  btnText: string;
  description: string;
}

export const THEME_PALETTES: Record<EditorialTheme, ThemePalette> = {
  light: {
    bgSage: '#CBCFB8',
    inkPrimary: '#1E3227',
    inkSecondary: '#3F5447',
    accentOlive: '#9B8A3E',
    glassBg: 'rgba(235, 240, 220, 0.48)',
    glassBorder: 'rgba(30, 50, 39, 0.18)',
    btnPrimary: '#1E3227',
    btnText: '#FFFFFF',
    description: 'Editorial Pale Sage & Forest Ink',
  },
  dark: {
    bgSage: '#111A15',
    inkPrimary: '#E6EAE3',
    inkSecondary: '#A0B2A5',
    accentOlive: '#D4C376',
    glassBg: 'rgba(24, 38, 30, 0.60)',
    glassBorder: 'rgba(230, 234, 227, 0.14)',
    btnPrimary: '#E6EAE3',
    btnText: '#111A15',
    description: 'Editorial Obsidian Forest & Luminous Sage',
  },
};

/**
 * Resolves active theme based on explicit stored user preference and system fallback
 */
export function resolveThemePreference(
  storedPreference: string | null | undefined,
  systemPrefersDark = false
): EditorialTheme {
  if (storedPreference === 'dark') return 'dark';
  if (storedPreference === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

/**
 * Returns the opposite theme for toggle actions
 */
export function getNextTheme(currentTheme: EditorialTheme): EditorialTheme {
  return currentTheme === 'dark' ? 'light' : 'dark';
}


