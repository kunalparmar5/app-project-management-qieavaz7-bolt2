import React, { useState } from 'react';
import { 
  Calculator, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Percent,
  IndianRupee,
  FileText,
  Phone,
  Mail,
  Star,
  Building,
  Users,
  Award,
  BarChart3,
  Target,
  Lightbulb,
  AlertTriangle,
  Home,
  DollarSign
} from 'lucide-react';

const HomeLoans = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const loanTypes = [
    {
      type: 'Home Purchase Loan',
      description: 'Finance for buying ready-to-move-in properties',
      features: ['Up to 90% financing', 'Competitive rates', 'Quick approval', 'Flexible tenure'],
      interestRate: '8.50% - 9.25%',
      maxAmount: '₹10 Crore',
      tenure: '30 years',
      processing: '0.50% + GST',
      eligibility: 'Salaried/Self-employed',
      icon: Building
    },
    {
      type: 'Home Construction Loan',
      description: 'Loan for constructing your dream home on owned land',
      features: ['Stage-wise disbursement', 'Flexible repayment', 'Expert guidance', 'Construction monitoring'],
      interestRate: '8.75% - 9.50%',
      maxAmount: '₹5 Crore',
      tenure: '30 years',
      processing: '0.50% + GST',
      eligibility: 'Land ownership required',
      icon: Users
    },
    {
      type: 'Home Improvement Loan',
      description: 'Renovate and improve your existing property',
      features: ['Quick processing', 'Minimal documentation', 'Attractive rates', 'No collateral'],
      interestRate: '9.00% - 10.50%',
      maxAmount: '₹50 Lakh',
      tenure: '15 years',
      processing: '1.00% + GST',
      eligibility: 'Property ownership required',
      icon: Award
    },
    {
      type: 'Plot Purchase Loan',
      description: 'Finance for buying residential plots',
      features: ['Up to 85% financing', 'Flexible tenure', 'Easy approval', 'Competitive rates'],
      interestRate: '9.25% - 10.00%',
      maxAmount: '₹2 Crore',
      tenure: '20 years',
      processing: '0.50% + GST',
      eligibility: 'Approved layout required',
      icon: Calculator
    }
  ];

  const eligibilityFactors = [
    {
      factor: 'Age',
      requirement: '21-65 years',
      details: 'Minimum 21 years at loan application, maximum 65 years at loan maturity',
      icon: Users,
      importance: 'Critical'
    },
    {
      factor: 'Income',
      requirement: 'Min ₹25,000/month',
      details: 'Stable monthly income with 2+ years employment history',
      icon: IndianRupee,
      importance: 'Critical'
    },
    {
      factor: 'Employment',
      requirement: '2+ years experience',
      details: 'Minimum 2 years in current job, 3+ years total experience',
      icon: Building,
      importance: 'High'
    },
    {
      factor: 'Credit Score',
      requirement: '750+ preferred',
      details: 'Higher score ensures better interest rates and faster approval',
      icon: Star,
      importance: 'High'
    },
    {
      factor: 'Debt-to-Income',
      requirement: 'Below 50%',
      details: 'Total EMIs should not exceed 50% of monthly income',
      icon: BarChart3,
      importance: 'Critical'
    },
    {
      factor: 'Property Value',
      requirement: 'Bank approved',
      details: 'Property should be in bank-approved projects/locations',
      icon: Home,
      importance: 'Critical'
    }
  ];

  const applicationProcess = [
    {
      step: 1,
      title: 'Pre-Application Research',
      description: 'Research and compare loan options from different lenders',
      duration: '1-2 weeks',
      activities: [
        'Compare interest rates from 3-4 banks',
        'Check eligibility criteria and requirements',
        'Calculate EMI and affordability',
        'Understand fees and charges',
        'Read terms and conditions carefully'
      ],
      documents: [],
      tips: 'Use online comparison tools and EMI calculators'
    },
    {
      step: 2,
      title: 'Document Preparation',
      description: 'Gather and organize all required documents',
      duration: '3-5 days',
      activities: [
        'Collect identity and address proofs',
        'Arrange income and employment documents',
        'Get property-related papers ready',
        'Obtain bank statements and tax returns',
        'Prepare passport-size photographs'
      ],
      documents: [
        'PAN Card, Aadhaar Card, Passport',
        'Salary slips (3 months), Form 16',
        'Bank statements (6 months)',
        'Property documents, Sale agreement',
        'ITR for last 2 years'
      ],
      tips: 'Keep both originals and photocopies ready'
    },
    {
      step: 3,
      title: 'Loan Application Submission',
      description: 'Submit application with complete documentation',
      duration: '1-2 days',
      activities: [
        'Fill application form accurately',
        'Submit all required documents',
        'Pay processing fee',
        'Provide additional information if requested',
        'Get acknowledgment receipt'
      ],
      documents: [],
      tips: 'Double-check all information before submission'
    },
    {
      step: 4,
      title: 'Verification Process',
      description: 'Bank conducts technical and legal verification',
      duration: '1-2 weeks',
      activities: [
        'Income and employment verification',
        'Property technical evaluation',
        'Legal document verification',
        'Credit score and history check',
        'Reference verification if required'
      ],
      documents: [],
      tips: 'Be available for verification calls and visits'
    },
    {
      step: 5,
      title: 'Loan Approval & Sanction',
      description: 'Bank approves loan and issues sanction letter',
      duration: '3-7 days',
      activities: [
        'Credit committee review and approval',
        'Sanction letter generation',
        'Terms and conditions finalization',
        'Loan agreement preparation',
        'Insurance and legal formalities'
      ],
      documents: [],
      tips: 'Review sanction letter terms carefully'
    },
    {
      step: 6,
      title: 'Disbursement',
      description: 'Loan amount disbursement after final formalities',
      duration: '1-3 days',
      activities: [
        'Property registration completion',
        'Insurance policy activation',
        'Final documentation signing',
        'Loan disbursement to seller/builder',
        'EMI schedule activation'
      ],
      documents: [],
      tips: 'Ensure all post-disbursement formalities are completed'
    }
  ];

  const banks = [
    {
      id: 1,
      name: 'State Bank of India',
      logo: 'SBI',
      interestRate: '8.50% - 9.25%',
      processingFee: '0.35% + GST',
      maxLoan: '₹10 Crore',
      tenure: '30 years',
      rating: 4.2,
      features: ['Quick approval', 'Doorstep service', 'Flexible repayment', 'Government backing'],
      popular: true,
      specialOffers: ['Women borrowers: 0.05% concession', 'Salary account holders: Processing fee waiver'],
      pros: ['Lowest processing fee', 'Wide branch network', 'Government bank reliability'],
      cons: ['Slower processing', 'Strict documentation', 'Limited digital services']
    },
    {
      id: 2,
      name: 'HDFC Bank',
      logo: 'HDFC',
      interestRate: '8.75% - 9.50%',
      processingFee: '0.50% + GST',
      maxLoan: '₹15 Crore',
      tenure: '30 years',
      rating: 4.5,
      features: ['Digital process', 'Pre-approved offers', 'Balance transfer', 'Quick disbursal'],
      popular: true,
      specialOffers: ['Pre-approved customers: Rate discount', 'Salary account: Processing fee discount'],
      pros: ['Fast processing', 'Excellent customer service', 'Digital convenience'],
      cons: ['Higher processing fee', 'Strict eligibility', 'Premium pricing']
    },
    {
      id: 3,
      name: 'ICICI Bank',
      logo: 'ICICI',
      interestRate: '8.65% - 9.40%',
      processingFee: '0.50% + GST',
      maxLoan: '₹20 Crore',
      tenure: '30 years',
      rating: 4.3,
      features: ['Online application', 'Quick disbursal', 'Top-up loans', 'Flexible EMI'],
      popular: false,
      specialOffers: ['NRI customers: Special rates', 'Existing customers: Rate benefits'],
      pros: ['High loan amount', 'Good digital platform', 'Flexible options'],
      cons: ['Variable interest rates', 'Complex fee structure', 'Limited physical presence']
    },
    {
      id: 4,
      name: 'Axis Bank',
      logo: 'AXIS',
      interestRate: '8.80% - 9.60%',
      processingFee: '1.00% + GST',
      maxLoan: '₹5 Crore',
      tenure: '30 years',
      rating: 4.1,
      features: ['Competitive rates', 'Flexible EMI', 'Construction finance', 'Quick approval'],
      popular: false,
      specialOffers: ['Salary account holders: Rate discount', 'Festival offers: Processing fee waiver'],
      pros: ['Competitive rates', 'Good customer service', 'Flexible terms'],
      cons: ['Higher processing fee', 'Limited loan amount', 'Strict property norms']
    }
  ];

  const documents = [
    {
      category: 'Identity & Address Proof',
      required: true,
      documents: [
        'PAN Card (mandatory for all applicants)',
        'Aadhaar Card with address',
        'Passport (if available)',
        'Voter ID Card',
        'Driving License'
      ],
      notes: 'Any two documents required, PAN is mandatory'
    },
    {
      category: 'Income Proof (Salaried)',
      required: true,
      documents: [
        'Salary slips for last 3 months',
        'Form 16 for last 2 years',
        'Employment certificate/offer letter',
        'Bank statements for last 6 months',
        'ITR for last 2 years (if applicable)'
      ],
      notes: 'All documents should be recent and properly signed'
    },
    {
      category: 'Income Proof (Self-Employed)',
      required: true,
      documents: [
        'ITR for last 3 years with computation',
        'Audited financial statements',
        'Bank statements for last 12 months',
        'Business registration certificate',
        'GST registration (if applicable)'
      ],
      notes: 'Business should be operational for minimum 3 years'
    },
    {
      category: 'Property Documents',
      required: true,
      documents: [
        'Sale agreement/allotment letter',
        'Building plan approval',
        'NOC from builder/society',
        'Property tax receipts',
        'Title documents and chain'
      ],
      notes: 'All property documents should be clear and verified'
    }
  ];

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const totalAmount = calculateEMI() * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  const taxBenefits = [
    {
      section: 'Section 80C',
      benefit: 'Principal Repayment',
      limit: '₹1.5 Lakh per year',
      description: 'Deduction on principal amount repaid during the financial year',
      eligibility: 'All home loan borrowers',
      example: 'If you repay ₹2 lakh principal, you can claim ₹1.5 lakh deduction'
    },
    {
      section: 'Section 24(b)',
      benefit: 'Interest Payment',
      limit: '₹2 Lakh per year',
      description: 'Deduction on interest paid on home loan for self-occupied property',
      eligibility: 'Self-occupied property only',
      example: 'If you pay ₹3 lakh interest, you can claim ₹2 lakh deduction'
    },
    {
      section: 'Section 80EEA',
      benefit: 'Additional Interest',
      limit: '₹1.5 Lakh per year',
      description: 'Additional deduction for first-time home buyers (affordable housing)',
      eligibility: 'First-time buyers, property value up to ₹45 lakh',
      example: 'Total interest deduction can be up to ₹3.5 lakh per year'
    },
    {
      section: 'Section 80EE',
      benefit: 'First-time Buyer',
      limit: '₹50,000 per year',
      description: 'Additional deduction for first-time home buyers',
      eligibility: 'First-time buyers, loan sanctioned before March 2017',
      example: 'Additional ₹50,000 deduction over Section 24(b) limit'
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Not Comparing Interest Rates',
      impact: 'Higher EMI and total interest cost',
      solution: 'Compare rates from at least 3-4 lenders',
      cost: '₹2-5 lakh extra over loan tenure'
    },
    {
      mistake: 'Ignoring Processing Fees',
      impact: 'Unexpected upfront costs',
      solution: 'Factor in all fees and charges',
      cost: '₹25,000 - ₹1 lakh additional cost'
    },
    {
      mistake: 'Choosing Longer Tenure',
      impact: 'Higher total interest payment',
      solution: 'Choose optimal tenure based on affordability',
      cost: '₹5-15 lakh extra interest'
    },
    {
      mistake: 'Not Reading Fine Print',
      impact: 'Hidden charges and penalties',
      solution: 'Read all terms and conditions carefully',
      cost: 'Variable, can be significant'
    },
    {
      mistake: 'Poor Credit Score',
      impact: 'Higher interest rates or rejection',
      solution: 'Improve credit score before applying',
      cost: '0.5-2% higher interest rate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Home Loans Guide 2024
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Everything you need to know about home loans - from eligibility to approval. Get the best deals with competitive interest rates and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and plan your finances with detailed breakdown</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="20000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹1L</span>
                    <span>₹2Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter tenure"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">EMI Breakdown</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ₹{calculateEMI().toLocaleString()}
                  </div>
                  <p className="text-gray-600">Monthly EMI</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{loanAmount.toLocaleString()}
                    </div>
                    <p className="text-gray-600 text-sm">Principal Amount</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{totalInterest.toLocaleString()}
                    </div>
                    <p className="text-gray-600 text-sm">Total Interest</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                  <p className="text-green-700 text-sm">Total Amount Payable</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan-to-Value Ratio:</span>
                    <span className="font-medium">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee (0.5%):</span>
                    <span className="font-medium">₹{(loanAmount * 0.005).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance Premium:</span>
                    <span className="font-medium">₹{(loanAmount * 0.001).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate Type:</span>
                    <span className="font-medium">Floating</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Affordability Check:</h4>
                  <p className="text-blue-800 text-sm">
                    For this EMI, your monthly income should be at least ₹{(calculateEMI() * 3).toLocaleString()}
                  </p>
                </div>

                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Apply for This Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Home Loans</h2>
            <p className="text-xl text-gray-600">Choose the right loan type based on your specific needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loanTypes.map((loan, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <loan.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{loan.type}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{loan.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Interest Rate</p>
                    <p className="font-bold text-green-600">{loan.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Max Amount</p>
                    <p className="font-medium">{loan.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Max Tenure</p>
                    <p className="font-medium">{loan.tenure}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Processing Fee</p>
                    <p className="font-medium">{loan.processing}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Key Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {loan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-blue-900 font-semibold text-sm">Eligibility:</p>
                  <p className="text-blue-800 text-sm">{loan.eligibility}</p>
                </div>

                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Loan Eligibility Criteria</h2>
            <p className="text-xl text-gray-600">Understand the key factors that determine your loan eligibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eligibilityFactors.map((factor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <factor.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      factor.importance === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {factor.importance}
                    </span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg mb-3">
                  <p className="text-green-900 font-semibold text-sm">Requirement:</p>
                  <p className="text-green-800 font-bold">{factor.requirement}</p>
                </div>
                
                <p className="text-gray-600 text-sm">{factor.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Eligibility Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Monthly Income</h4>
                <p className="text-gray-600 text-sm">Your gross monthly income determines the maximum EMI you can afford</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">EMI Capacity</h4>
                <p className="text-gray-600 text-sm">Maximum 50% of your income can go towards all EMIs combined</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Loan Amount</h4>
                <p className="text-gray-600 text-sm">Based on EMI capacity and chosen tenure, calculate maximum loan amount</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Loan Application Process</h2>
            <p className="text-xl text-gray-600">Step-by-step guide to applying for a home loan</p>
          </div>

          <div className="space-y-12">
            {applicationProcess.map((step, index) => (
              <div key={index} className="relative">
                {index < applicationProcess.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-green-200"></div>
                )}
                
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10">
                        {step.step}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-3/4">
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                          Key Activities:
                        </h4>
                        <ul className="space-y-2">
                          {step.activities.map((activity, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        {step.documents.length > 0 && (
                          <>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              Required Documents:
                            </h4>
                            <ul className="space-y-2">
                              {step.documents.map((doc, i) => (
                                <li key={i} className="text-gray-700 flex items-start">
                                  <ArrowRight className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        
                        <div className="bg-green-50 p-3 rounded-lg mt-4">
                          <h5 className="font-semibold text-green-900 mb-1 text-sm">Pro Tip:</h5>
                          <p className="text-green-800 text-sm">{step.tips}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Top Home Loan Providers</h2>
            <p className="text-xl text-gray-600">Detailed comparison of leading banks and their offerings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {banks.map((bank) => (
              <div key={bank.id} className={`bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-shadow ${
                bank.popular ? 'border-green-500' : 'border-gray-200'
              }`}>
                {bank.popular && (
                  <div className="bg-green-500 text-white text-center py-2 -mx-6 -mt-6 mb-6 rounded-t-xl text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">{bank.logo}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{bank.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{bank.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Interest Rate</p>
                    <p className="font-bold text-green-600">{bank.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Processing Fee</p>
                    <p className="font-medium">{bank.processingFee}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Max Loan</p>
                    <p className="font-medium">{bank.maxLoan}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Max Tenure</p>
                    <p className="font-medium">{bank.tenure}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Key Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {bank.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Special Offers:</p>
                  <div className="space-y-1">
                    {bank.specialOffers.map((offer, index) => (
                      <div key={index} className="bg-yellow-50 p-2 rounded text-xs text-yellow-800">
                        {offer}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-1 text-sm">Pros:</h5>
                    <ul className="space-y-1">
                      {bank.pros.map((pro, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-1 text-sm">Cons:</h5>
                    <ul className="space-y-1">
                      {bank.cons.map((con, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <AlertTriangle className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Compare
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Required Documents Checklist</h2>
            <p className="text-xl text-gray-600">Complete list of documents needed for home loan application</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documents.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  {category.required && (
                    <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                      Required
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-4">
                  {category.documents.map((doc, docIndex) => (
                    <li key={docIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-900 font-semibold text-sm mb-1">Important Note:</p>
                  <p className="text-blue-800 text-sm">{category.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Loan Tax Benefits</h2>
            <p className="text-xl text-gray-600">Maximize your tax savings with home loan deductions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {taxBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{benefit.section}</h3>
                    <p className="text-green-600 font-medium">{benefit.benefit}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-900 font-semibold">Deduction Limit:</span>
                    <span className="text-green-800 font-bold text-lg">{benefit.limit}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-blue-900 font-semibold text-sm mb-1">Eligibility:</p>
                  <p className="text-blue-800 text-sm">{benefit.eligibility}</p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-yellow-900 font-semibold text-sm mb-1">Example:</p>
                  <p className="text-yellow-800 text-sm">{benefit.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Maximum Tax Savings Potential</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₹3.5 Lakh</div>
                <p className="text-gray-600">Maximum Annual Deduction</p>
                <p className="text-sm text-gray-500 mt-1">For first-time buyers (affordable housing)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">₹1.05 Lakh</div>
                <p className="text-gray-600">Tax Savings (30% bracket)</p>
                <p className="text-sm text-gray-500 mt-1">Actual savings depend on tax bracket</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">₹31.5 Lakh</div>
                <p className="text-gray-600">Lifetime Tax Savings</p>
                <p className="text-sm text-gray-500 mt-1">Over 30-year loan tenure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Home Loan Mistakes to Avoid</h2>
            <p className="text-xl text-gray-600">Learn from others' mistakes and save money on your home loan</p>
          </div>

          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      {mistake.mistake}
                    </h3>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Impact:</h4>
                    <p className="text-gray-700 text-sm">{mistake.impact}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                    <p className="text-gray-700 text-sm">{mistake.solution}</p>
                  </div>
                  
                  <div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <h4 className="font-semibold text-red-900 text-sm">Potential Cost:</h4>
                      <p className="text-red-800 text-sm font-medium">{mistake.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply for Your Home Loan?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance and competitive rates for your home loan application
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Call +91 9876543210
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center">
              <Mail className="mr-2 h-5 w-5" />
              Get Expert Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLoans;