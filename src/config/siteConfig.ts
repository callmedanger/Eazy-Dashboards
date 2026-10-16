/**
 * Central Configuration for Eazy Dashboard / Eazy ERP
 * Product-based Pakistani business software that replaces manual Excel sheets & paper registers.
 */

export const BRAND_NAME = "Eazy Dashboard";
export const BRAND_SHORT = "Eazy";
export const PRODUCT_TYPE = "Business ERP & Analytics Software";

export const BRAND_COLORS = {
  navy: "#0B2A5B",
  navyDark: "#071B3B",
  navyLight: "#133D80",
  teal: "#1BA6A6",
  tealDark: "#148080",
  tealLight: "#25C4C4",
  lightSurface: "#F5F4F0",
  darkSurface: "#0A0C10",
  errorRed: "#E5484D",
  gold: "#C9A24B", // Money highlights strictly
} as const;

export const CONTACT_INFO = {
  email: "eazydashboard@gmail.com",
  phone1: "+92 340 8381736",
  phone2: "+92 331 4812848",
  phone1Formatted: "+92 340 8381736",
  phone2Formatted: "+92 331 4812848",
  phone1Digits: "923408381736",
  phone2Digits: "923314812848",
  phone: "+92 340 8381736",
  whatsappNumber: "+923408381736",
  whatsappFormatted: "+92 340 8381736",
  formEndpoint: "https://formsubmit.co/ajax/eazydashboard@gmail.com",
  defaultWhatsappMessage: "Salam Eazy Dashboard team! I want to upgrade my business from Excel and paper registers to your ERP & live dashboard software.",
};

export const NAV_LINKS = [
  { label: "The Problem", href: "#problem", cell: "A2" },
  { label: "Transformation", href: "#transformation", cell: "A3" },
  { label: "Implementation", href: "#how-it-works", cell: "A4" },
  { label: "ERP Modules", href: "#features", cell: "A5" },
  { label: "Industries", href: "#industries", cell: "A6" },
  { label: "Comparison", href: "#comparison", cell: "A7" },
  { label: "FAQ", href: "#faq", cell: "A8" },
] as const;

export const HERO_COPY = {
  badge: "fx = ERP POWERED BUSINESS",
  headline: "Power your Excel-run business with a modern ERP.",
  subheadline: "We replace chaotic Excel files, registers, and handwritten ledgers with an integrated ERP software suite — featuring counter billing, stock control, and live dashboards on your phone.",
  primaryCta: "Book a Free Software Walkthrough",
  secondaryCta: "See ERP Features",
  selectionPrompt: "Drag to select cells. Watch raw spreadsheet chaos transform into structured ERP intelligence.",
  touchPrompt: "Tap to see how our ERP cleans and powers this data.",
  sheetName: "Sales_FINAL_v7_edit.xlsx",
};

export const PROBLEM_COPY = {
  badge: "B2 = MANUAL_SYSTEM_FAILURE",
  headline: "Excel wasn't built to run your entire enterprise.",
  subheadline: "Businesses lose substantial revenue every month to silent formula breaks, stolen stock, untracked customer credit, and relying on one person who holds all the passwords.",
  pains: [
    {
      id: "versions",
      cellRef: "B4",
      title: "10 files, 10 versions, zero accountability",
      desc: "Sales_FINAL.xlsx, Stock_Amir.xlsx, Cash_Ledger_v3. Nobody knows what stock is actually in the warehouse or what today's real balance is.",
      stat: "10+",
      statLabel: "Conflicting file versions per week",
      errorType: "#N/A",
      tag: "VERSION_CHAOS",
    },
    {
      id: "formula",
      cellRef: "B5",
      title: "One broken formula corrupts the whole month",
      desc: "An accidental keystroke by a cashier wipes out inventory formulas. The deficit remains completely invisible until vendor payment day.",
      stat: "PKR 142,000",
      statLabel: "Average undetected formula leak (example)",
      errorType: "#REF!",
      tag: "FORMULA_CORRUPTION",
    },
    {
      id: "mobile",
      cellRef: "B6",
      title: "Owner is blind whenever away from the shop",
      desc: "When you are traveling or meeting suppliers, you have to call your cashier and wait for blurred mobile phone photos of paper registers.",
      stat: "0",
      statLabel: "Live metrics available away from desktop",
      errorType: "OFFLINE",
      tag: "BLIND_MANAGEMENT",
    },
    {
      id: "permissions",
      cellRef: "B7",
      title: "No security: everyone sees owner profit margins",
      desc: "Sending an Excel file exposes vendor buying rates, confidential markup percentages, and owner bank accounts to junior data clerks.",
      stat: "100%",
      statLabel: "Data exposed without row-level security",
      errorType: "LEAK",
      tag: "ZERO_PERMISSIONS",
    },
    {
      id: "hours",
      cellRef: "B8",
      title: "Customer credit & reconciliation takes days of manual cross-checking",
      desc: "Matching paper receipts, bank transfers, and delivery notes takes 3 exhausting days at month-end instead of one instant click.",
      stat: "36 hrs",
      statLabel: "Monthly manual reconciliation time (example)",
      errorType: "#DIV/0!",
      tag: "TIME_SINK",
    },
  ],
};

export const WORKFLOW_COPY = {
  badge: "C3 = IMPLEMENTATION_ROADMAP",
  headline: "How We Transition Your Business to ERP.",
  subheadline: "You don't need IT staff or weeks of downtime. Our engineers handle the complete data migration and counter setup.",
  steps: [
    {
      step: "01",
      title: "Audit & Map",
      cellRef: "C4",
      action: "We analyze your current Excel sheets, registers & workflow.",
      details: "Our business analyst reviews your item catalogs, pricing tiers, party lists, and counter sales processes.",
      statusText: "Analyzing business records & workflows...",
    },
    {
      step: "02",
      title: "Data Migration",
      cellRef: "D4",
      action: "We migrate your historical data into the ERP database.",
      details: "Your inventory balances, pending customer accounts, and supplier credits are cleanly cleansed and imported.",
      statusText: "Clean Database Ingestion (0 Formula Errors)",
    },
    {
      step: "03",
      title: "Software Deployment",
      cellRef: "E4",
      action: "Setup billing terminals, permissions & barcode printing.",
      details: "We configure staff POS forms, receipt printers, and restrict sensitive margin access with role-based logins.",
      statusText: "ERP Active: Terminals & Warehouses Connected",
    },
    {
      step: "04",
      title: "Live Mobile Control",
      cellRef: "F4",
      action: "Owner gets live phone dashboard & daily WhatsApp digest.",
      details: "Monitor cash in hand, branch sales, and recovery alerts from your smartphone with automated 9:00 PM WhatsApp briefs.",
      statusText: "Mobile Sync Live: WhatsApp Bot Configured",
    },
  ],
};

export const FEATURES_COPY = [
  {
    id: "pos-billing",
    title: "Fast POS Counter Billing",
    cellRef: "A10",
    desc: "Lightning-fast sales invoicing with barcode scanning, thermal receipt printing, and split cash/Raast payments.",
    badge: "COUNTER POS",
    highlight: "Sub-second checkout",
  },
  {
    id: "inventory",
    title: "Warehouse & Stock Control",
    cellRef: "B10",
    desc: "Real-time stock deduction on every sale. Auto low-stock warnings and batch/expiry tracking for wholesale & retail.",
    badge: "WAREHOUSE",
    highlight: "Zero stock shrinkage",
  },
  {
    id: "credit",
    title: "Digital Customer Ledger & Credit Recovery",
    cellRef: "C10",
    desc: "Track every customer's credit limit, aging receivables, and send automated WhatsApp payment reminders with one tap.",
    badge: "CREDIT CONTROL",
    highlight: "Automated SMS/WhatsApp",
  },
  {
    id: "roles",
    title: "Role-Based Staff Access",
    cellRef: "D10",
    desc: "Cashiers can only bill; managers can edit prices; only the owner can see total net profit and bank balances.",
    badge: "SECURITY",
    highlight: "Owner / Manager / Cashier",
  },
  {
    id: "whatsapp",
    title: "Daily WhatsApp Owner Reports",
    cellRef: "E10",
    desc: "Every evening at 9:00 PM, get an executive summary sent directly to the owner's WhatsApp: sales, recoveries, and expenses.",
    badge: "AUTOMATION",
    highlight: "No app install required",
  },
  {
    id: "multi-branch",
    title: "Multi-Branch Cloud Sync",
    cellRef: "F10",
    desc: "Connect multiple stores, branches, or warehouses across major commercial cities in one central live system.",
    badge: "MULTI-STORE",
    highlight: "Centralized control",
  },
  {
    id: "mobile-dashboard",
    title: "Live Mobile Executive Analytics",
    cellRef: "G10",
    desc: "Check real-time revenue, gross margins, and live counter footfall on your smartphone while traveling or in meetings.",
    badge: "EXECUTIVE MOBILE",
    highlight: "Real-time sync",
  },
  {
    id: "urdu",
    title: "Bilingual English & Local UI",
    cellRef: "H10",
    desc: "Interface, receipts, and reports tailored with intuitive commercial terms: Ledgers, Collections, Credit Aging, and Profit Margin.",
    badge: "LOCALIZED",
    highlight: "English & Localized",
  },
];

export const INDUSTRIES_COPY = {
  badge: "fx = INDUSTRY_ERP_CONFIGURATIONS",
  headline: "Configured for Pakistani SME Industries.",
  subheadline: "Pre-built business modules tailored for local workflows — whether you manage a counter, a clinic, or a warehouse.",
  industries: [
    {
      id: "retail",
      name: "Retail Shops, Marts & Superstores",
      icon: "ShoppingBag",
      metrics: [
        { label: "Daily Counter Footfall", value: "542 customers", change: "+12% weekend", status: "good" },
        { label: "Average Basket Size", value: "PKR 2,450", change: "+PKR 210 vs last mo", status: "good", isMoney: true },
        { label: "Cash vs Raast / Cards", value: "68% / 32%", change: "Raast QR integrated", status: "good" },
        { label: "Shrinkage & Stock Variance", value: "0.2%", change: "Down from 3.1% in Excel", status: "good" },
        { label: "Monthly Gross Sales", value: "PKR 3,890,000", change: "+14.8% YoY", status: "good", isMoney: true },
      ],
      chartData: [2.8, 3.1, 3.3, 3.5, 3.65, 3.78, 3.89],
      chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    {
      id: "distributors",
      name: "Wholesale & FMCG Distribution",
      icon: "Boxes",
      metrics: [
        { label: "Daily Order Volume", value: "PKR 4,890,000", change: "42 retailers", status: "good", isMoney: true },
        { label: "Receivables Aging (>45D)", value: "PKR 720,000", change: "Auto WhatsApp reminder sent", status: "warn", isMoney: true },
        { label: "Warehouse Turn Rate", value: "14.2 days", change: "-2 days holding time", status: "good" },
        { label: "Rider Cash in Transit", value: "PKR 1,450,000", change: "6 delivery vans reconciling", status: "warn", isMoney: true },
        { label: "Top Area Revenue", value: "Rawalpindi Zone 1", change: "34% of volume", status: "good" },
      ],
      chartData: [3.2, 3.8, 4.1, 4.4, 4.6, 4.7, 4.89],
      chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    {
      id: "pharmacies",
      name: "Pharmacies & Medical Stores",
      icon: "Pill",
      metrics: [
        { label: "Daily Counter Prescriptions", value: "318 bills", change: "+18 vs avg", status: "good" },
        { label: "Near-Expiry Stock (60D)", value: "12 items", change: "Return to distributor flagged", status: "warn" },
        { label: "Gross Margin", value: "19.4%", change: "+0.8% margin control", status: "good" },
        { label: "Fast-Moving SKU Stock", value: "98.2%", change: "Zero stockouts", status: "good" },
        { label: "Daily Turnover", value: "PKR 540,000", change: "+7.4% MoM", status: "good", isMoney: true },
      ],
      chartData: [380, 410, 460, 490, 510, 525, 540],
      chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    {
      id: "gyms",
      name: "Gyms & Fitness Centers",
      icon: "Dumbbell",
      metrics: [
        { label: "Active Members", value: "482", change: "+14 this month", status: "good" },
        { label: "Renewals Due (7 Days)", value: "39", change: "PKR 195,000 pending", status: "warn" },
        { label: "Monthly Recurring Revenue", value: "PKR 1,420,000", change: "+11.2% MoM", status: "good", isMoney: true },
        { label: "Peak Attendance", value: "6:30 PM - 9:00 PM", change: "88% capacity", status: "good" },
        { label: "Trainer Retention", value: "94.6%", change: "Coach Hamza", status: "good" },
      ],
      chartData: [45, 52, 58, 64, 72, 85, 94],
      chartLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    {
      id: "clinics",
      name: "Doctors & Medical Clinics",
      icon: "Stethoscope",
      metrics: [
        { label: "Patients per Day", value: "64", change: "+8% vs last week", status: "good" },
        { label: "Appointments vs No-Shows", value: "91% / 9%", change: "SMS reminders active", status: "good" },
        { label: "Revenue by Service", value: "PKR 890,000", change: "Consultations & Labs", status: "good", isMoney: true },
        { label: "Pending Lab Payments", value: "PKR 65,000", change: "3 accounts due", status: "warn", isMoney: true },
        { label: "Avg Patient Wait Time", value: "14 mins", change: "Down from 38 mins", status: "good" },
      ],
      chartData: [32, 45, 51, 48, 62, 59, 64],
      chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    {
      id: "logistics",
      name: "Logistics & Delivery Fleet",
      icon: "Truck",
      metrics: [
        { label: "Deliveries per Day", value: "1,240", change: "Citywide dispatch", status: "good" },
        { label: "On-Time Dispatch %", value: "96.4%", change: "+2.1% this week", status: "good" },
        { label: "Fuel Cost per Route", value: "PKR 312 / parcel", change: "-8.4% efficiency", status: "good", isMoney: true },
        { label: "COD Cash in Transit", value: "PKR 3,450,000", change: "12 riders settling", status: "warn", isMoney: true },
        { label: "Top Rider Dispatch", value: "98 parcels", change: "Tariq Mahmood", status: "good" },
      ],
      chartData: [850, 920, 1040, 1110, 1180, 1240, 1290],
      chartLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    },
    {
      id: "schools",
      name: "Schools & Academies",
      icon: "GraduationCap",
      metrics: [
        { label: "Total Active Enrollment", value: "840 students", change: "Branch A + B", status: "good" },
        { label: "Fee Collection %", value: "92.8%", change: "PKR 380,000 pending", status: "warn" },
        { label: "Monthly Operating Margin", value: "31.5%", change: "Balanced payroll", status: "good" },
        { label: "Teacher Biometric Attendance", value: "98.4%", change: "Daily synced", status: "good" },
        { label: "Term Fee Collected", value: "PKR 5,120,000", change: "Q3 Target achieved", status: "good", isMoney: true },
      ],
      chartData: [720, 750, 780, 810, 825, 835, 840],
      chartLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7"],
    },
  ],
  financialStrip: [
    { label: "Monthly Revenue", value: "PKR 4,820,000", change: "+14.6% vs last mo", status: "good" },
    { label: "Operating Expenses", value: "PKR 3,110,000", change: "Rent, Salaries, Utilities", status: "neutral" },
    { label: "Net Profit", value: "PKR 1,710,000", change: "35.4% Net Margin", status: "good" },
    { label: "Cash Flow Runway", value: "68 Days", change: "Safe liquidity buffer", status: "good" },
    { label: "Receivables Aging (>30D)", value: "PKR 340,000", change: "4 accounts due for follow-up", status: "warn" },
  ],
};

export const COMPARISON_COPY = {
  badge: "fx = SOFTWARE_COMPARISON",
  headline: "Why replace Excel with Eazy ERP?",
  subheadline: "An honest comparison between manual spreadsheets, rigid foreign ERPs (SAP/Oracle), and Eazy ERP software built for Pakistani SMEs.",
  columns: ["Criterion", "Excel & Paper Registers", "Rigid Foreign ERPs (SAP/Oracle)", "Eazy ERP Software"],
  rows: [
    {
      criterion: "Daily Workflow",
      excel: "Manual typing, fragile formulas, zero audit trail",
      erp: "Heavy, bloated screens; takes 15 clicks for 1 invoice",
      eazy: "Streamlined 1-second billing, barcode scan & automated customer ledger",
      verdict: "Speed",
    },
    {
      criterion: "Implementation & Migration",
      excel: "DIY, error-prone, no data integrity",
      erp: "6-12 months consultant setup costing millions",
      eazy: "We migrate your existing Excel data in 24-48 hours",
      verdict: "Turnkey",
    },
    {
      criterion: "Pricing Structure",
      excel: "Free upfront, but loses lakhs in untracked stock & errors",
      erp: "Dollar-pegged subscriptions + expensive maintenance",
      eazy: "Transparent, predictable Pakistani Rupee (PKR) pricing",
      verdict: "Fair",
    },
    {
      criterion: "Owner Mobile Access",
      excel: "Unusable on phone screens; calling accountant",
      erp: "Requires desktop VPN and complex technical setup",
      eazy: "Instant phone dashboard + daily WhatsApp evening brief",
      verdict: "Mobile-First",
    },
    {
      criterion: "Permissions & Security",
      excel: "None: staff sees profit margins and owner ledger",
      erp: "Complex enterprise roles needing full-time IT admin",
      eazy: "Clean 1-click roles: Cashier, Manager, Owner",
      verdict: "Secure",
    },
    {
      criterion: "Commercial Context & Localization",
      excel: "English only; no native WhatsApp or Raast",
      erp: "Foreign localized templates; rigid tax setups",
      eazy: "Native WhatsApp alerts, Raast QR & PKR formatting",
      verdict: "Localized",
    },
  ],
};

export const FAQ_COPY = [
  {
    q: "Is Eazy Dashboard just an online spreadsheet viewer?",
    a: "No. Eazy Dashboard is a complete Business ERP & Management Software product. We install and configure counter billing terminals, inventory stock tracking, warehouse control, customer credit management, and give you live executive mobile dashboards.",
  },
  {
    q: "How does our old Excel and register data get into the software?",
    a: "Our implementation team handles the complete migration. We take your existing Excel files, vendor price lists, customer credit balances, and product catalogs, clean any errors, and import them directly into your new software.",
  },
  {
    q: "Will my staff find it difficult to use?",
    a: "No. We designed the billing counter and data-entry forms to be dead simple — even cashiers with zero computer background learn it within 15 minutes. It uses straightforward commercial business terms like Collections, Invoicing, and Customer Accounts.",
  },
  {
    q: "Can my staff see my business net profit or bank balance?",
    a: "Never. With strict role-based access control, counter staff only see their own billing screen. Margin percentages, wholesale purchasing rates, and owner drawings remain strictly private and accessible only to you on your personal mobile dashboard.",
  },
  {
    q: "How does the daily WhatsApp report work?",
    a: "Every evening at your preferred closing time (e.g. 9:00 PM), our system sends an automated executive summary straight to your personal WhatsApp: today's total counter sales, cash in hand, customer recoveries, and accounts with overdue credit.",
  },
  {
    q: "How much does the software cost?",
    a: "Contact us for a tailored quote. We price transparently in Pakistani Rupees based on your number of counters, branches, and business requirements. There are no surprise enterprise consulting fees or dollar exchange inflation.",
  },
];
