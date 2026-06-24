import { 
  Car, Bike, HeartPulse, Shield, Plane, Home, Flame, Anchor, 
  Users, Building2, Briefcase, Heart, AlertTriangle, UserCheck, 
  Baby, HeartHandshake, Truck, BatteryCharging, Clock, ShieldCheck,
  Percent, Banknote, CheckCircle2
} from 'lucide-react';

export const insuranceData = {
  car: {
    title: "Car Insurance",
    sub: "Compare & Buy Best Car Insurance Online",
    icon: Car,
    color: "blue",
    bgImg: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy the best car insurance policy online. Compare rates from top insurers, get instant digital policy, cashless claims at 5,000+ garages, and save up to 80% on premiums.",
    desc: "Protect your vehicle against accidents, theft, fire, and third-party liabilities. Get a digital policy instantly with zero paperwork and guaranteed best pricing.",
    badges: [
      { label: "Cashless Garages", sub: "5,000+ Network", icon: Shield },
      { label: "Instant Issuance", sub: "In 2 Minutes", icon: ShieldCheck },
      { label: "No Claim Bonus", sub: "Up to 50% discount", icon: Heart },
      { label: "Zero Dep Cover", sub: "100% claim payout", icon: Flame }
    ],
    whatIs: "Car insurance is a legally binding agreement between a vehicle owner and an insurance provider. In exchange for regular premium payments, the insurer provides financial protection against physical damage or bodily injuries resulting from traffic collisions, theft, natural disasters, and key liabilities involving third parties. Under the Indian Motor Vehicles Act, having at least a Third-Party Liability cover is mandatory for all vehicles plying on public roads.",
    whyImportant: "Driving without insurance exposes you to heavy legal fines (up to ₹4,000 and/or imprisonment) and massive out-of-pocket expenses in the event of an accident. Car insurance protects your hard-earned savings from accidental repairs, covers third-party legal liabilities, and offers personal accident cover for the owner-driver.",
    whoShouldBuy: "Every car owner in India, whether owning a new luxury sedan, a pre-owned hatchback, or a commercial taxi, must buy car insurance. It is mandatory for legal compliance and essential for financial peace of mind.",
    variants: [
      { name: "Third-Party Liability Cover", desc: "Mandatory by law. Covers only third-party property damage and bodily injuries. Does not cover damage to your own car.", example: "If you hit another vehicle, this policy pays for their repairs." },
      { name: "Comprehensive Car Insurance", desc: "Highly recommended. Covers third-party liabilities plus own-damage due to accidents, theft, fire, and natural disasters.", example: "Covers repairs if your car hits a pole or gets flooded." },
      { name: "Own Damage (OD) Insurance", desc: "For vehicle owners who already have an active standalone Third-Party policy. Covers only own-damage.", example: "Ideal if you bought a multi-year third-party policy and want to renew own-damage separately." }
    ],
    features: [
      { title: "Zero Depreciation Cover", desc: "Get full claim value for plastic, rubber, and metal parts without any depreciation deduction." },
      { title: "Engine Protection Cover", desc: "Covers hydrostatic lock and leakage damages to the engine box, highly useful during water-logging." },
      { title: "24/7 Roadside Assistance (RSA)", desc: "Emergency towing, flat-tire changes, fuel delivery, and key lockout support anywhere, anytime." },
      { title: "Return to Invoice (RTI)", desc: "In case of theft or total loss, receive the full invoice value of the car including registration and road tax." }
    ],
    covered: [
      "Accidental external damage or collisions",
      "Theft, burglary, or housebreaking of the vehicle",
      "Fire, self-ignition, explosion, and lightning damage",
      "Natural calamities (Earthquake, Floods, Cyclone, Landslide)",
      "Man-made calamities (Riots, Strikes, Terrorist activities)",
      "In-transit damage by road, rail, air, or waterways",
      "Third-party liability (death/injury/property damage)"
    ],
    notCovered: [
      "Drunk driving or driving under the influence of drugs",
      "Driving without a valid license or active registration",
      "Consequential loss (damage to parts after the accident due to neglect)",
      "Mechanical and electrical breakdowns or wear and tear",
      "Damage to tires/tubes unless the car is damaged in the same accident",
      "Driving outside the geographical boundaries of India",
      "Deliberate accidents or self-inflicted damage"
    ],
    claimTimeline: [
      { step: "1", title: "Intimation", desc: "Register your claim online or call us immediately after the accident." },
      { step: '2', title: "Surveyor Visit", desc: "An authorized surveyor inspects the damage at the garage." },
      { step: '3', title: "Document Upload", desc: "Upload driving license, RC book, FIR copy, and claim form." },
      { step: '4', title: "Repair Work", desc: "Network garage repairs the vehicle using genuine spare parts." },
      { step: '5', title: "Settlement", desc: "Insurer settles bills directly with the cashless garage." }
    ],
    rejectionReasons: [
      { reason: "Delay in Intimation", desc: "Informing the insurer weeks after the accident without reasonable cause." },
      { reason: "Invalid Driver License", desc: "Driving with an expired license, learner's license without an instructor, or wrong class." },
      { reason: "Commercial Usage of Personal Car", desc: "Using a private vehicle for taxi services or commercial cargo delivery." },
      { reason: "Unauthorized Repairs", desc: "Getting the car repaired before the surveyor inspects the damage." }
    ],
    premiumFactors: [
      { factor: "Insured Declared Value (IDV)", desc: "The current market value of your vehicle. Higher IDV equals higher premium." },
      { factor: "Age and Make of Vehicle", desc: "Older cars have lower IDV but might have higher risk; premium varies by engine CC." },
      { factor: "Geographical Location (RTO)", desc: "Metro cities (Zone A) have higher traffic density and thus higher premiums." },
      { factor: "No Claim Bonus (NCB)", desc: "Accumulated discount (20% to 50%) for claim-free years reduces own-damage premium." }
    ],
    terms: [
      { term: "IDV (Insured Declared Value)", desc: "The maximum sum assured fixed by the insurer in case of theft or total loss of the vehicle." },
      { term: "NCB (No Claim Bonus)", desc: "A reward discount given to policyholders for not registering any claims in the previous policy year." },
      { term: "Deductibles", desc: "Compulsory deductibles (fixed by IRDAI) and voluntary deductibles that you agree to pay at the time of claim." },
      { term: "Zero Depreciation", desc: "An add-on cover that waives off depreciation deduction on replaced parts during a claim." }
    ],
    documents: [
      "Copy of Car Registration Certificate (RC)",
      "Valid Driving License of the person driving",
      "Original Insurance Policy Document",
      "Filled and signed Claim Form",
      "Copy of FIR (mandatory in case of theft, third-party injury, or major accident)",
      "Original repair bills and payment receipts (if reimbursement claim)"
    ],
    faqs: [
      { q: "What is NCB in car insurance?", a: "No Claim Bonus (NCB) is a discount on the own-damage premium offered by insurers for every claim-free year. It starts at 20% for the first claim-free year and can go up to 50% for five consecutive claim-free years." },
      { q: "Is third-party motor insurance mandatory in India?", a: "Yes, under the Motor Vehicles Act, third-party liability insurance is legally mandatory for all vehicles operating on public roads in India." },
      { q: "What is IDV and how is it calculated?", a: "IDV stands for Insured Declared Value. It is the maximum sum assured that the insurer pays if your vehicle is stolen or totally wrecked. It is calculated by subtracting depreciation based on the car's age from the manufacturer's listed selling price." },
      { q: "Can I transfer my NCB to another car?", a: "Yes, NCB belongs to the owner, not the vehicle. If you sell your old car, you can obtain an NCB certificate from your insurer and apply the same discount to a new car." },
      { q: "What is zero depreciation cover?", a: "Zero depreciation cover is an add-on policy. Standard policies deduct depreciation (wear & tear) on replaced parts like plastic, rubber, and glass. Zero dep ensure 100% reimbursement on these parts." },
      { q: "How long does it take to settle a cashless car claim?", a: "Once the surveyor approves the estimation and the garage completes the repairs, the final billing approval takes between 4 to 24 hours." },
      { q: "What is a voluntary deductible?", a: "It is the amount you voluntarily choose to pay out of your pocket during a claim. Choosing a voluntary deductible decreases your yearly premium." },
      { q: "Are natural disasters covered under private car insurance?", a: "Yes, comprehensive insurance covers damages caused by floods, earthquakes, hurricanes, landslides, and storm water ingression." },
      { q: "What should I do if my car is stolen?", a: "File an immediate FIR at the local police station, notify your insurance company, and obtain a 'Non-Traceable Report' from the police to process the claim." },
      { q: "What is the consequence of driving with an expired policy?", a: "It is illegal, exposes you to steep traffic fines, and if an accident occurs, you will have to pay for all damages and third-party liabilities out of pocket." },
      { q: "Does car insurance cover engine damage due to waterlogging?", a: "Standard policies do not cover engine damage from hydrostatic lock (starting engine in water). You need an Engine Protection add-on for this." },
      { q: "Can I buy car insurance online instantly?", a: "Yes, PolicyPerfect allows you to compare and buy policies online in under 2 minutes with instant digital copy delivery." },
      { q: "What is a cashless garage network?", a: "A list of workshops that have tie-ups with the insurance company, allowing you to get your car repaired without paying cash for approved repairs." },
      { q: "How do I renew an expired car insurance policy?", a: "You can renew it online. For long-expired policies, a physical or digital vehicle inspection might be required before the policy is active." },
      { q: "Is roadside assistance worth it?", a: "Yes, it is highly recommended. It saves you from being stranded on highways due to flat tires, empty fuel tanks, towing needs, or battery issues." }
    ],
    seoContent: "Car insurance is essential for every vehicle owner in India. Under the Motor Vehicles Act of 1988, driving without third-party cover is a severe legal offense. Choosing a comprehensive policy through PolicyPerfect ensures you get maximum coverage. We offer custom add-ons like zero-depreciation, return-to-invoice, consumable covers, and engine protection. When you compare quotes from top insurers like ICICI Lombard, HDFC Ergo, and Bajaj Allianz, you can save up to 80% on premiums. Ensure you keep your vehicle details, previous policy status, and NCB percentage handy when buying online to ensure a seamless process. Cashless claims are settled quickly via our extensive network of 5,000+ garages. If an accident occurs, simply notify our team, take photos of the spot, file an FIR if necessary, and send the car to a network garage. Our customer service team will coordinate with the surveyor to get your car back on the road in no time."
  },
  bike: {
    title: "Bike Insurance",
    sub: "Two Wheeler Insurance Online - Save Up to 80%",
    icon: Bike,
    color: "sky",
    bgImg: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Compare and buy two wheeler insurance online instantly. Save up to 80% on premiums with comprehensive own-damage and mandatory third-party coverage.",
    desc: "Protect your scooter or motorcycle against accidents, theft, and third-party liabilities. Buy or renew online in under 2 minutes with zero paper documentation.",
    badges: [
      { label: "Save up to 80%", sub: "On Own-Damage", icon: Shield },
      { label: "Cashless Repairs", sub: "3,000+ Garages", icon: Shield },
      { label: "Instant Policy", sub: "No Inspection", icon: Clock },
      { label: "NCB Benefits", sub: "Up to 50% discount", icon: Percent }
    ],
    whatIs: "Bike insurance is an agreement where the insurance company provides financial coverage against damages to your motorcycle or scooter caused by road accidents, natural disasters, theft, and fire, along with legal liability to third parties. Third-party insurance is legally mandatory in India for all two-wheelers.",
    whyImportant: "Two-wheelers are highly vulnerable to accidents, skidding, and theft. Having bike insurance ensures you comply with legal mandates, avoid steep fines from traffic police, and protect yourself from high repair costs or third-party claims.",
    whoShouldBuy: "Every owner of a two-wheeler (scooters, commuter bikes, cruisers, super-bikes, or electric two-wheelers) in India must buy a valid two-wheeler insurance policy.",
    variants: [
      { name: "Mandatory Third-Party Cover", desc: "Covers legal liabilities, property damage, and injury to third parties. Does not cover damage to your own bike.", example: "If your scooter scratches a luxury car, this pays for the car's repair." },
      { name: "Comprehensive Two-Wheeler Insurance", desc: "Covers own-damage, theft, fire, natural disasters, plus third-party liabilities.", example: "Covers repairs if your bike skids on wet roads or gets stolen." },
      { name: "Own Damage (OD) Policy", desc: "Covers only own-damage if you already have a multi-year third-party policy.", example: "Best when renewing yearly own-damage cover separately." }
    ],
    features: [
      { title: "Zero Depreciation Add-on", desc: "Get full claim settlement for replaced fiber and metal parts without any depreciation deduction." },
      { title: "Roadside Assistance (RSA)", desc: "Get 24/7 help for towing, flat tires, minor breakdowns, and key lockouts." },
      { title: "Personal Accident Cover", desc: "Mandatory personal accident cover of ₹15 Lakhs for the owner-driver." },
      { title: "Helmet Cover", desc: "Optional add-on covering the cost of replacing your helmet if damaged in an accident." }
    ],
    covered: [
      "Accidental external damage or collisions",
      "Theft or burglary of the two-wheeler",
      "Fire, explosion, lightning, and self-ignition",
      "Natural disasters (floods, earthquakes, storms)",
      "Man-made crises (riots, strikes, acts of vandalism)",
      "Third-party liability (bodily injury, death, property damage)"
    ],
    notCovered: [
      "Driving without a valid driving license",
      "Riding under the influence of alcohol or intoxicants",
      "Mechanical and electrical breakdowns",
      "General wear & tear (tires, engine oil deterioration)",
      "Consequential damage (riding a damaged bike causing engine seize)",
      "Using personal two-wheeler for illegal racing or commercial cargo"
    ],
    claimTimeline: [
      { step: "1", title: "Register Claim", desc: "Call us or file a claim online immediately after the incident." },
      { step: '2', title: "Survey Damage", desc: "Surveyor inspects the bike at the workshop (digital/physical)." },
      { step: '3', title: "Submit Docs", desc: "Provide RC, driving license, policy copy, and claim form." },
      { step: '4', title: "Repair", desc: "Bike is repaired with genuine parts at a network garage." },
      { step: '5', title: "Delivery", desc: "Settle direct cashless bills and ride back home." }
    ],
    rejectionReasons: [
      { reason: "Invalid License Class", desc: "Riding a geared motorcycle with a non-geared license." },
      { reason: "Delay in Theft Report", desc: "Failing to file FIR and notify insurer immediately after theft." },
      { reason: "Expired Policy Renewal Delay", desc: "Registering a claim for an accident that happened during policy lapse." },
      { reason: "Pillion Rider without Cover", desc: "Claims rejected if personal accident rider was not taken for pillion." }
    ],
    premiumFactors: [
      { factor: "Engine Capacity (CC)", desc: "Higher engine CC translates to higher third-party and own-damage premium." },
      { factor: "Insured Declared Value (IDV)", desc: "The current value of the bike. Reduces with vehicle age." },
      { factor: "No Claim Bonus (NCB)", desc: "Saves up to 50% of the own-damage premium if no claims were filed." },
      { factor: "Zone/Location", desc: "Metro areas with high traffic have slightly higher rates." }
    ],
    terms: [
      { term: "IDV", desc: "Insured Declared Value: The sum insured paid in case of theft or total wreckage." },
      { term: "NCB", desc: "No Claim Bonus: Accumulated discount for claim-free years." },
      { term: "Consumables", desc: "Engine oil, lubricants, bolts - usually excluded in standard claims unless add-on taken." },
      { term: "Third-Party Cover", desc: "Legal protection against liabilities caused to third parties." }
    ],
    documents: [
      "Two-wheeler Registration Certificate (RC)",
      "Valid Driving License",
      "Policy copy",
      "Claim form",
      "FIR (in case of theft, collision with third-party, or major bodily injuries)"
    ],
    faqs: [
      { q: "Is a multi-year bike policy better?", a: "Yes, multi-year policies (2 or 3 years) protect you from yearly hikes in third-party premiums and save you the hassle of yearly renewals." },
      { q: "How is two-wheeler IDV calculated?", a: "It is calculated based on manufacturer price minus depreciation. For brand new bikes, it is 95% of retail price. For bikes older than 5 years, it is decided mutually between owner and insurer." },
      { q: "What does Zero Depreciation cover in two wheelers?", a: "Standard bike policies pay only 50% of the cost for plastic and nylon parts. Zero dep covers 100% of these costs." },
      { q: "Can I transfer my bike insurance when selling the bike?", a: "Yes, you can transfer the policy to the new owner by submitting the sale agreement, transfer forms, and paying a small transfer fee." },
      { q: "What should I do if my bike gets stolen?", a: "Immediately file an FIR, notify your insurer, submit the keys and documents, and wait for the police non-traceable report." },
      { q: "Does bike insurance cover pillion rider?", a: "You can purchase an optional Personal Accident Cover for the unnamed pillion rider for added protection." },
      { q: "Is helmet cover included in comprehensive bike insurance?", a: "Standard policies do not cover helmets. You need a dedicated helmet cover add-on for this benefit." },
      { q: "Can I renew a lapsed bike policy without inspection?", a: "For lapses of less than 90 days, renewal is usually instant. Long lapses might require video inspection or photos." },
      { q: "What is the penalty for driving a bike without insurance?", a: "Under the amended Motor Vehicles Act, a fine of ₹2,000 and/or up to 3 months jail for the first offense." },
      { q: "How does cashless bike insurance work?", a: "Your bike gets repaired at a network garage, and the insurer pays the garage directly. You only pay compulsory deductibles/non-covered parts." },
      { q: "Can I customize my two-wheeler cover?", a: "Yes, you can add zero dep, roadside assistance, engine protection, and passenger cover riders." },
      { q: "Does the premium change based on bike color?", a: "No, bike premium is calculated based on CC, age, RTO zone, and IDV, not color." },
      { q: "What is the grace period for bike insurance?", a: "There is no grace period for coverage. Once a policy expires, you are uninsured. However, you have 90 days to retain your NCB." },
      { q: "Are custom accessories covered?", a: "You must declare high-value electrical/non-electrical accessories and pay an extra premium to get them insured." },
      { q: "How do I claim for third-party damages?", a: "Report the incident to the police, file a case in the Motor Accident Claims Tribunal (MACT), and notify your insurer." }
    ],
    seoContent: "Comparing and buying two-wheeler insurance online has never been easier. With PolicyPerfect, you can evaluate plans from top insurers side-by-side to secure the best policy. Two-wheelers are subject to high risks of accidents, theft, and self-ignition. Our comprehensive plans shield you from all these liabilities, and custom add-ons like zero-depreciation and roadside assistance ensure total financial comfort. You can calculate premiums using engine cubic capacity (CC), vehicle age, and zone. Keep your registration certificate and previous policy document ready for instant renewal. With cashless repair facilities at thousands of garages across India, PolicyPerfect is your trusted companion for two-wheeler protection."
  },
  health: {
    title: "Health Insurance",
    sub: "Comprehensive Medical Coverage for Your Family",
    icon: HeartPulse,
    color: "teal",
    bgImg: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy the best health insurance plans online. Compare top policies, get cashless hospitalization at 10,000+ network hospitals, tax savings under Section 80D, and pre & post care cover.",
    desc: "Protect your family's savings from rising medical costs. Secure comprehensive health cover with cashless hospital access, day-care treatments, and organ donor expenses.",
    badges: [
      { label: "10,000+ Hospitals", sub: "Cashless Network", icon: Shield },
      { label: "Tax Benefit", sub: "Under Section 80D", icon: Percent },
      { label: "High Claim Ratio", sub: "Guaranteed support", icon: Heart },
      { label: "Pre & Post Care", sub: "Up to 90 days cover", icon: Clock }
    ],
    whatIs: "Health insurance is a contract between an individual and an insurance provider where the insurer agrees to pay for the medical and surgical expenses of the insured. It pays for hospitalization costs, medicines, doctor consultations, day-care procedures, and pre/post-hospitalization fees. With medical inflation rising at 10-15% annually in India, health insurance is an absolute necessity.",
    whyImportant: "A single critical illness or major surgery can deplete a family's entire life savings. Health insurance ensures you have access to high-quality healthcare without financial compromises. It also offers tax rebates under Section 80D of the Income Tax Act.",
    whoShouldBuy: "Individuals, salaried professionals, business owners, parents, and senior citizens must buy health insurance to protect their health and wealth.",
    variants: [
      { name: "Individual Health Insurance", desc: "Covers a single individual for a dedicated sum insured.", example: "Best for young unmarried professionals." },
      { name: "Family Floater Policy", desc: "A single sum insured shared among all family members (spouse, children, parents). Premium is based on the oldest member.", example: "A family of 4 sharing a ₹10 Lakhs sum insured." },
      { name: "Senior Citizen Health Cover", desc: "Tailored for individuals above 60 years. Covers geriatric care, pre-existing diseases, with higher co-pay options.", example: "Specially designed for parents/grandparents with chronic illnesses." }
    ],
    features: [
      { title: "No Claim Bonus (NCB)", desc: "Get an increase in your sum insured (up to 100%) for claim-free years at no extra premium cost." },
      { title: "Restoration Benefit", desc: "Automatically refills your sum insured if it gets exhausted during a policy year for a different illness." },
      { title: "OPD Coverage", desc: "Covers outpatient expenses like doctor consultations, dental treatments, and pharmacy bills." },
      { title: "Maternity & Newborn Cover", desc: "Covers delivery charges and medical expenses for the newborn from day one." }
    ],
    covered: [
      "In-patient hospitalization charges (room rent, ICU, doctor fees)",
      "Pre-hospitalization expenses (up to 60 days prior to admission)",
      "Post-hospitalization expenses (up to 90 days after discharge)",
      "Daycare treatments (surgeries requiring less than 24h stay)",
      "Domiciliary hospitalization (treatment at home if hospital beds are full)",
      "Organ donor expenses during transplant surgeries",
      "Emergency ambulance transportation charges"
    ],
    notCovered: [
      "Pre-existing diseases during the initial waiting period (usually 1 to 4 years)",
      "Cosmetic, plastic, or aesthetic surgeries",
      "Self-inflicted injuries, suicide attempts, or adventure sports",
      "Non-medical expenses (food, administration charges, diapers)",
      "Treatment for substance abuse, alcohol addiction, or gender change",
      "Outpatient treatments (OPD) unless specifically covered in the policy",
      "War, nuclear perils, and natural disasters (in some basic plans)"
    ],
    claimTimeline: [
      { step: "1", title: "Hospital Admission", desc: "Present your health card at the network hospital's TPA desk." },
      { step: '2', title: "Pre-Auth Request", desc: "Hospital sends cashless approval request to insurer/TPA." },
      { step: '3', title: "TPA Review", desc: "TPA reviews medical history, doctor notes, and sum insured." },
      { step: '4', title: "Initial Approval", desc: "TPA issues initial cashless approval within 2-4 hours." },
      { step: '5', title: "Discharge & Settlement", desc: "Final billing is settled directly; you pay only non-medical costs." }
    ],
    rejectionReasons: [
      { reason: "Non-Disclosure of Pre-existing Disease", desc: "Failing to declare diabetes, hypertension, or past surgeries during purchase." },
      { reason: "Claim within Waiting Period", desc: "Claiming for specified diseases (like cataracts or hernia) before the initial waiting period ends." },
      { reason: "Room Rent Limit Violation", desc: "Admitting to a deluxe room when policy allows only a single private room." },
      { reason: "Non-payable items", desc: "Hospital billing containing excessive non-medical supplies (PPE kits, gloves)." }
    ],
    premiumFactors: [
      { factor: "Age of Eldest Insured", desc: "Medical risk increases with age, so older policyholders pay higher premiums." },
      { factor: "Medical History", desc: "Pre-existing health conditions or tobacco consumption can increase the premium." },
      { factor: "Sum Insured Selected", desc: "Higher sum insured cover (e.g. ₹5 Lakhs vs ₹1 Crore) has higher premiums." },
      { factor: "City of Residence", desc: "Tier 1 metro cities have higher medical costs, increasing the premium rate." }
    ],
    terms: [
      { term: "Co-Payment", desc: "A fixed percentage of the claim amount (e.g. 10%) that the policyholder must pay out of pocket." },
      { term: "Waiting Period", desc: "The duration during which certain conditions/treatments are not covered." },
      { term: "Room Rent Limit", desc: "The maximum daily charge allowed for the hospital room, usually capped at 1% of sum insured." },
      { term: "Restoration Cover", desc: "Refilling of the sum insured limit once it is exhausted in the policy year." }
    ],
    documents: [
      "Health Card issued by the insurance provider",
      "Completed and signed Claim Form",
      "Original discharge summary/card from the hospital",
      "Detailed hospital bills, receipts, and payment proofs",
      "Doctor's prescription, consultation notes, and diagnostic reports (X-Ray, blood tests)",
      "Cancelled cheque for electronic fund transfer (for reimbursement claims)"
    ],
    faqs: [
      { q: "What is a waiting period in health insurance?", a: "A waiting period is the time you must wait before certain diseases or pre-existing conditions are covered by the policy. It generally ranges from 1 to 4 years." },
      { q: "Are maternity expenses covered?", a: "Yes, but usually after a waiting period ranging from 9 months to 4 years depending on the specific health insurance plan." },
      { q: "What is the difference between cashless and reimbursement claims?", a: "In cashless claims, the insurer pays the hospital directly. In reimbursement claims, you pay the bills yourself and claim the money back from the insurer later." },
      { q: "What is a pre-existing disease (PED)?", a: "Any condition, ailment, or injury diagnosed or treated within 48 months prior to purchasing the health policy is defined as a pre-existing disease." },
      { q: "Does health insurance cover daycare procedures?", a: "Yes, modern plans cover daycare treatments like cataract surgery, chemotherapy, dialysis, and tonsillectomy which are completed within 24 hours." },
      { q: "What is Room Rent capping?", a: "It is the limit on daily hospital room charges. If you exceed this limit, you have to pay a proportionate share of all associated medical bills." },
      { q: "Can I buy a policy for my parents online?", a: "Yes, you can easily buy senior citizen or parent health policies online. They might need a tele-medical examination." },
      { q: "What is the tax benefit under Section 80D?", a: "You can claim a tax deduction up to ₹25,000 for self/family, and an additional ₹50,000 if insuring senior citizen parents." },
      { q: "What is Restoration Benefit?", a: "It restores 100% of your sum insured automatically if you exhaust it on hospitalized treatment, protecting you from multiple hospitalizations in a year." },
      { q: "How is a family floater different from individual cover?", a: "A family floater shares one sum insured among all members. If one member uses it, the cover for others reduces. Individual policies keep sum insured separate." },
      { q: "Are diagnostic tests covered under health insurance?", a: "Yes, if they are part of pre-hospitalization (prior to admission) or post-hospitalization, they are fully covered." },
      { q: "Does health insurance cover COVID-19?", a: "Yes, all standard health insurance policies in India cover COVID-19 hospitalization and related medical expenses." },
      { q: "Can I transfer my health policy to another insurer?", a: "Yes, under IRDAI portability rules, you can transfer your policy to another insurer without losing your accrued benefits like waiting period credits." },
      { q: "What is a TPA (Third Party Administrator)?", a: "A TPA is an agency licensed by IRDAI that processes health claims, manages network hospital tie-ups, and handles cashless approvals on behalf of insurers." },
      { q: "What is a co-pay clause?", a: "It is a clause where you agree to pay a fixed percentage of the claim amount. It is common in senior citizen plans to keep premiums low." }
    ],
    seoContent: "Health insurance is your shield against unexpected medical bills. With healthcare costs growing rapidly, comparing policies is the best way to secure your family's future. PolicyPerfect helps you compare health plans from top insurers like Star Health, Care Health, Niva Bupa, and HDFC Ergo. You can analyze key features like room rent limits, ICU caps, waiting periods, restoration benefits, and no-claim bonuses. You can also calculate your tax savings under Section 80D of the Income Tax Act. Check network hospitals in your city to ensure cashless treatments are easily accessible. Our dedicated claim settlement desk provides 24x7 support to guide your family during hospitalization, ensuring a hassle-free, stress-free claim approval process."
  },
  critical: {
    title: "Critical Illness Insurance",
    sub: "Lump Sum Payout on Diagnosis of Life-Threatening Diseases",
    icon: AlertTriangle,
    color: "red",
    bgImg: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy critical illness insurance online. Get a guaranteed lump-sum payout on diagnosis of cancer, heart attack, stroke, kidney failure, and 30+ life-threatening illnesses.",
    desc: "Secure a lump-sum payout immediately upon diagnosis of any covered critical illness. Use the funds for specialized treatment, debt clearance, or household expenses.",
    badges: [
      { label: "Lump Sum Payout", sub: "On First Diagnosis", icon: Shield },
      { label: "36+ Major Diseases", sub: "Cancer, Stroke, Heart", icon: HeartPulse },
      { label: "Income Replacement", sub: "For family expenses", icon: Banknote },
      { label: "Tax Benefits", sub: "Under Sec 80D", icon: Percent }
    ],
    whatIs: "Critical Illness Insurance is a specialized policy that pays out a pre-determined lump sum amount if the insured is diagnosed with any of the critical illnesses specified in the policy document. Unlike standard health insurance which reimburses actual hospital bills, critical illness insurance gives you a direct cash payout to spend however you need.",
    whyImportant: "Treating critical illnesses like cancer or organ failure requires expensive treatment and leads to prolonged loss of income. A critical illness policy acts as an income replacement tool to pay for specialized foreign treatments, home modifications, and daily household liabilities.",
    whoShouldBuy: "Sole breadwinners of the family, individuals with a family history of heart/cancer ailments, self-employed professionals, and those with high liabilities (home loans) must buy this cover.",
    variants: [
      { name: "Standalone Critical Illness Cover", desc: "A dedicated policy with a separate sum insured and premium. Recommended for high-value coverage.", example: "A ₹25 Lakhs dedicated policy from a health insurer." },
      { name: "Critical Illness Rider", desc: "An add-on cover attached to your primary term life or health insurance policy.", example: "Adding a critical illness benefit to your term plan for a nominal fee." }
    ],
    features: [
      { title: "Lump Sum Benefit", desc: "Receive the entire sum insured in cash as soon as the disease is diagnosed and verified." },
      { title: "Global Treatment Cover", desc: "Since you get cash, you can travel abroad for specialized treatment or therapies." },
      { title: "Survival Period Clause", desc: "Requires the policyholder to survive for a specific period (usually 15-30 days) after diagnosis to receive the payout." }
    ],
    covered: [
      "Cancer of specified severity",
      "Myocardial Infarction (First Heart Attack)",
      "Stroke resulting in permanent symptoms",
      "Kidney failure requiring regular dialysis",
      "Major Organ / Bone Marrow Transplant",
      "Multiple Sclerosis with persisting symptoms",
      "Permanent Paralysis of limbs"
    ],
    notCovered: [
      "Illnesses diagnosed within the first 90 days of policy start (initial waiting period)",
      "Critical illness arising from pregnancy, childbirth, or abortion",
      "Critical illness due to HIV/AIDS infection",
      "Congenital internal or external diseases",
      "Self-inflicted injuries or suicide attempts",
      "Diagnosis made outside India (unless policy specifies international coverage)"
    ],
    claimTimeline: [
      { step: "1", title: "Diagnosis", desc: "Get medical diagnosis and tests confirming the critical illness." },
      { step: '2', title: "Notify Insurer", desc: "Notify the insurance provider within 7 days of diagnosis." },
      { step: '3', title: "Survival Period", desc: "Survive the mandatory survival period (typically 30 days)." },
      { step: '4', title: "Submit Documents", desc: "Submit medical reports, doctor statements, and claim form." },
      { step: '5', title: "Payout", desc: "Receive the lump-sum cash directly in your bank account." }
    ],
    rejectionReasons: [
      { reason: "Pre-existing Condition Link", desc: "Disease arising due to a pre-existing medical issue not disclosed during purchase." },
      { reason: "Failing the Survival Period", desc: "If the insured passes away before completing the 30-day survival period." },
      { reason: "Severity Threshold Not Met", desc: "The diagnosis does not match the exact severity definition (e.g. early-stage cancer)." },
      { reason: "Claim during initial 90 days", desc: "Diagnosis made during the initial cooling-off period of the policy." }
    ],
    premiumFactors: [
      { factor: "Age of Insured", desc: "Older individuals have a much higher statistical risk of critical illness." },
      { factor: "Tobacco / Smoker Status", desc: "Smokers pay significantly higher premiums due to elevated cancer/heart risks." },
      { factor: "Sum Insured Chosen", desc: "Higher lump-sum benefit options require higher premium payments." },
      { factor: "Occupation", desc: "Hazardous jobs involving toxic chemicals or radiation increase the premium rate." }
    ],
    terms: [
      { term: "Survival Period", desc: "The time (usually 30 days) the insured must survive after diagnosis to qualify for the payout." },
      { term: "Lump Sum Payout", desc: "Paying the entire sum assured in one single transaction rather than installments." },
      { term: "Initial Waiting Period", desc: "A 90-day cooling period at the start of the policy where no claims are processed." },
      { term: "Rider", desc: "An add-on cover attached to a base policy for extra premium." }
    ],
    documents: [
      "Completed Claim Form",
      "Detailed medical diagnosis reports and lab tests",
      "Doctor certificate confirming the diagnosis and severity of the illness",
      "Discharge summary (if hospitalized)",
      "ID Proof of the policyholder",
      "Cancelled cheque copy for claim transfer"
    ],
    faqs: [
      { q: "What is Critical Illness Insurance?", a: "It is a policy that pays out a lump sum if you are diagnosed with a covered life-threatening illness, providing financial support during recovery." },
      { q: "How is it different from normal health insurance?", a: "Health insurance pays actual hospital bills. Critical illness insurance pays you a fixed cash sum upon diagnosis, regardless of hospital charges." },
      { q: "What diseases are covered?", a: "Commonly covered diseases include cancer, heart attack, stroke, kidney failure, major organ transplants, and paralysis." },
      { q: "What is the survival period?", a: "It is a clause requiring you to survive a certain number of days (usually 30 days) after diagnosis to be eligible for the claim." },
      { q: "Can I use the claim money for any purpose?", a: "Yes, there are no restrictions. You can use the cash for treatment, paying off loans, child education, or daily expenses." },
      { q: "Is cancer covered in all stages?", a: "Generally, only advanced or specified severity cancers are covered. Early-stage cancers or carcinoma-in-situ are usually excluded." },
      { q: "What is the initial waiting period?", a: "It is a 90-day period from the policy launch date. No critical illness claims are payable if diagnosed within this duration." },
      { q: "Does the policy continue after the payout?", a: "No, once the lump sum is paid out for a diagnosed critical illness, the policy terminates." },
      { q: "Is tax benefit available?", a: "Yes, premiums paid qualify for tax deduction under Section 80D." },
      { q: "Can a smoker buy this policy?", a: "Yes, but smokers have higher premiums due to the increased risk of cancer and cardiovascular diseases." },
      { q: "Is medical test mandatory before buying?", a: "For younger ages, it might be waived. For individuals above 45 or choosing high sum assured, medical tests are mandatory." },
      { q: "Do I need this if I have corporate health insurance?", a: "Yes, corporate health insurance only covers hospital bills and is lost if you leave the job. Critical illness plan pays cash and stays with you." },
      { q: "What is the average sum assured recommended?", a: "It is recommended to have a cover equal to 2 to 3 years of your annual income to replace lost earnings." },
      { q: "Are lifestyle diseases covered?", a: "Diabetes or hypertension themselves are not critical illnesses, but organ failures resulting from them are covered." },
      { q: "Can I buy it online instantly?", a: "Yes, comparison and instant purchase are supported on PolicyPerfect." }
    ],
    seoContent: "Critical Illness Insurance is an invaluable asset for protecting your family's future. Standard health insurance only pays for hospital charges, leaving you to manage other costs. A critical illness plan provides a massive lump-sum payout immediately upon diagnosis of life-threatening diseases like cancer, heart attack, or permanent paralysis. This cash can be used for advanced treatments abroad, paying off outstanding home loans, or maintaining your family's daily lifestyle while you recover. Compare and buy the best critical illness plans and riders at PolicyPerfect today to ensure absolute security."
  },
  senior: {
    title: "Senior Citizen Health Insurance",
    sub: "Dedicated Health Protection for Seniors (Aged 60+)",
    icon: UserCheck,
    color: "amber",
    bgImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Best senior citizen health insurance plans online. Compare health policies for parents and grandparents aged 60+. Cashless hospital cover, low waiting periods, and Sec 80D tax benefits.",
    desc: "Give your elderly parents the gift of secure health. Get tailored senior citizen plans covering pre-existing diseases, critical care, and cashless network hospitalization.",
    badges: [
      { label: "Designed for 60+", sub: "Senior Health Focus", icon: Shield },
      { label: "Cashless Treatment", sub: "At 10,000+ Hospitals", icon: HeartPulse },
      { label: "Pre-existing Cover", sub: "Reduced Waiting Period", icon: Clock },
      { label: "Tax Deduction", sub: "Up to ₹50,000 Sec 80D", icon: Percent }
    ],
    whatIs: "Senior Citizen Health Insurance is a health insurance policy specifically crafted for elderly individuals aged 60 and above. These policies are designed keeping in mind the higher medical risks, frequent hospitalizations, and pre-existing medical conditions typical in senior years. They often feature reduced waiting periods for ailments like diabetes and hypertension.",
    whyImportant: "Medical expenses tend to spike drastically during old age, and standard policies might refuse new cover or charge exorbitant rates. Senior citizen policies guarantee coverage, cover day-care procedures, and relieve children from the financial strain of parents' medical emergencies.",
    whoShouldBuy: "Children looking to secure their retired parents, and self-funded retirees aged 60+ who want to protect their post-retirement savings.",
    variants: [
      { name: "Individual Senior Citizen Plan", desc: "A separate sum insured policy for each parent.", example: "A dedicated ₹5 Lakhs cover for your father." },
      { name: "Senior Floater Policy", desc: "A shared sum insured plan covering both mother and father together.", example: "A joint ₹10 Lakhs floater for mother and father." }
    ],
    features: [
      { title: "Reduced Waiting Period", desc: "Waiting period for pre-existing diseases like hypertension is reduced to 1 or 2 years instead of 4 years." },
      { title: "Daycare Treatment Cover", desc: "Covers minor surgical procedures like cataract or dialysis that don't need overnight stay." },
      { title: "Alternative Treatments (AYUSH)", desc: "Covers hospitalization expenses for Ayurveda, Unani, Sidha, and Homeopathy treatments." }
    ],
    covered: [
      "In-patient hospitalization expenses (room rent, boarding, nursing)",
      "Intensive Care Unit (ICU) expenses",
      "Medical practitioner, specialist, and anaesthetist fees",
      "Medicines, drugs, and consumables used during stay",
      "Pre & Post-hospitalization medical bills",
      "Cataract surgery costs (usually capped per eye)",
      "Road ambulance charges to the hospital"
    ],
    notCovered: [
      "Routine medical checkups and dental treatments",
      "Cost of spectacles, contact lenses, and hearing aids",
      "Treatments related to self-inflicted injuries or suicide attempts",
      "Cosmetic surgeries or joint replacement waiting periods (if not met)",
      "Non-medical expenses and service fees in hospital bills",
      "Treatment taken outside India"
    ],
    claimTimeline: [
      { step: "1", title: "Admit & Inform", desc: "Admit parent to network hospital and show health card." },
      { step: '2', title: "TPA Request", desc: "Hospital TPA desk submits pre-authorization request." },
      { step: '3', title: "Approval", desc: "Insurer reviews doctor note and grants cashless approval." },
      { step: '4', title: "Treatment", desc: "Get medical treatment without out-of-pocket payment." },
      { step: '5', title: "Discharge", desc: "Hospital bill is settled; sign documents to discharge." }
    ],
    rejectionReasons: [
      { reason: "Non-Disclosure of Medical History", desc: "Failing to disclose parent's history of heart bypass or diabetes during purchase." },
      { reason: "Co-payment Neglect", desc: "Disagreement over paying the co-pay percentage during claim settlement." },
      { reason: "Room Rent Limit Violation", desc: "Selecting a private suite when the policy allows only twin-sharing room." },
      { reason: "Active Waiting Period", desc: "Claiming for joint replacement surgery within the first year of policy." }
    ],
    premiumFactors: [
      { factor: "Age of Parent", desc: "Premium rises steeply with increasing age bracket." },
      { factor: "Pre-existing Disease status", desc: "Existing illnesses might increase premium or require co-pay additions." },
      { factor: "Co-payment Option Chosen", desc: "Opting for higher co-pay (e.g. 20%) decreases the annual premium." },
      { factor: "Zone Classification", desc: "Higher medical cost zones (metros) have higher premiums." }
    ],
    terms: [
      { term: "Co-payment", desc: "A mandatory percentage of the bill that the senior citizen/child must pay." },
      { term: "AYUSH Cover", desc: "Coverage for alternative medical treatments like Ayurveda and Homeopathy." },
      { term: "Pre-existing Diseases (PED)", desc: "Ailments present in the policyholder before buying the policy." },
      { term: "No Claim Bonus", desc: "Accrued discount or extra sum assured earned for claim-free years." }
    ],
    documents: [
      "Senior Citizen Health Card",
      "Signed Claim Form",
      "Discharge Summary from hospital",
      "Original hospital bills and receipts",
      "Doctor prescriptions and diagnostic lab reports",
      "KYC documents of the policyholder"
    ],
    faqs: [
      { q: "What is Senior Citizen Health Insurance?", a: "It is a health insurance policy specifically tailored for individuals aged 60 and above, covering geriatric medical needs." },
      { q: "Is medical test mandatory before buying?", a: "Most insurers require a pre-policy medical checkup for seniors. Some digital policies offer tele-medical review." },
      { q: "What is co-payment in senior plans?", a: "Co-payment is a clause where the policyholder agrees to pay a portion of the bill (usually 10% to 20%), while the insurer pays the rest." },
      { q: "Are pre-existing diseases covered?", a: "Yes, but after a waiting period, which is typically shorter (1-2 years) compared to standard plans." },
      { q: "Can I claim tax deduction for parents' premium?", a: "Yes, you can claim a deduction up to ₹50,000 under Section 80D for premiums paid for senior citizen parents." },
      { q: "Does it cover daycare procedures like cataract?", a: "Yes, cataract, dialysis, and chemotherapy are fully covered daycare procedures." },
      { q: "What is the maximum entry age?", a: "Most senior policies have an entry age from 60 to 75 or 80 years, with lifelong renewability." },
      { q: "Are alternative treatments covered?", a: "Yes, AYUSH hospitalization (Ayurveda, Homeopathy, etc.) is covered in most modern senior plans." },
      { q: "What is the waiting period for joint replacement?", a: "Typically, major surgeries like joint replacements or cataracts have a specific waiting period of 2 years." },
      { q: "Can I buy a floater plan for my parents?", a: "Yes, you can buy a senior citizen family floater plan covering both father and mother under a single sum insured." },
      { q: "Is domiciliary hospitalization covered?", a: "Yes, if the doctor recommends home treatment because a hospital bed is unavailable or the patient is unfit to move." },
      { q: "What happens to the policy if one parent passes away?", a: "The surviving parent can continue the policy as an individual plan, and the premium is adjusted accordingly." },
      { q: "How does cashless hospital network help seniors?", a: "It avoids the stress of arranging large cash sums during emergencies. The bills are settled directly with the hospital." },
      { q: "What are non-medical expenses?", a: "Items like registration fees, gloves, oxygen masks, and housekeeping supplies that insurers don't pay. Policyholder must settle these." },
      { q: "Why compare senior citizen policies on PolicyPerfect?", a: "We help you compare premiums, co-pay clauses, waiting periods, and network hospital lists from 25+ top insurers to find the best deal." }
    ],
    seoContent: "Protecting retired parents from medical emergencies is a priority for every child. Senior Citizen Health Insurance ensures that old age is peaceful and financially secure. PolicyPerfect lists specialized health plans designed for seniors aged 60+. These policies feature lower waiting periods for pre-existing diseases, cover ambulance costs, AYUSH treatments, and offer tax deductions under Section 80D. Compare plans, check co-pay clauses, and secure the best policy instantly online with our dedicated advisor support."
  },
  parent: {
    title: "Parent Health Insurance",
    sub: "Secure Your Parents' Health & Well-being",
    icon: Users,
    color: "indigo",
    bgImg: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Compare and buy health insurance for parents online. Secure cashless medical treatment, pre-existing disease cover, daycare procedures, and tax savings up to ₹50,000 under Section 80D.",
    desc: "Protect your parents with customized health insurance plans. Covers hospitalization, pre-existing diseases, critical care, and offers tax benefits for children paying the premium.",
    badges: [
      { label: "Parents Protection", sub: "Tailored Plans", icon: Shield },
      { label: "Cashless Networks", sub: "10,000+ Hospitals", icon: HeartPulse },
      { label: "Pre-existing Disease", sub: "Reduced Waiting Period", icon: Clock },
      { label: "Tax Benefit", sub: "Save up to ₹50,000 Sec 80D", icon: Percent }
    ],
    whatIs: "Parent Health Insurance is a dedicated health policy designed to provide comprehensive medical coverage for your parents. Unlike standard family plans where parents are grouped with young children (which increases premium rates for everyone), parent health insurance keeps their coverage separate and tailors features like OPD, dialysis, and cardiac care specifically for senior age profiles.",
    whyImportant: "As parents age, the frequency of medical consultations and hospital visits increases. Employer-provided group health covers are often insufficient or disappear after retirement. A independent parent health policy ensures quality healthcare at private hospitals without draining your salary or their retirement funds.",
    whoShouldBuy: "Salaried individuals or business owners who want to secure their dependent or retired mother and father with premium medical coverage.",
    variants: [
      { name: "Individual Parent Health Plan", desc: "Separate dedicated policies for mother and father. No sharing of sum assured.", example: "₹5 Lakhs cover for father + ₹5 Lakhs cover for mother." },
      { name: "Joint Parent Floater Plan", desc: "A single shared sum insured covering both parents.", example: "A joint ₹10 Lakhs shared cover for both parents." }
    ],
    features: [
      { title: "Organ Donor Cover", desc: "Covers medical expenses incurred for harvesting organs during transplant surgeries." },
      { title: "Annual Health Checkup", desc: "Complimentary preventive health screenings for parents to monitor chronic illnesses." },
      { title: "No Room Rent Cap Option", desc: "Add-on that allows you to choose private single rooms without any daily capping restrictions." }
    ],
    covered: [
      "In-patient hospitalization charges (ICU, room rent, nursing)",
      "Doctor consultation fees and specialist charges",
      "Medicines, diagnostic tests, and surgical devices",
      "Pre & Post-hospitalization expenses (60/90 days)",
      "Daycare surgeries like cataract, kidney stone removal",
      "Alternative treatments (Ayurveda, Yoga, Naturopathy)",
      "Emergency road ambulance services"
    ],
    notCovered: [
      "Routine dental, vision, or cosmetic treatments",
      "Hearing aids, wheelchair, or external prosthetics",
      "Treatment of self-inflicted injuries or suicide attempts",
      "Waiting periods for specified illnesses (usually 1-2 years)",
      "Non-medical fees in hospital invoice",
      "Hospitalization outside India"
    ],
    claimTimeline: [
      { step: "1", title: "Admission", desc: "Show policy card at network hospital admission desk." },
      { step: '2', title: "Pre-Auth submission", desc: "Hospital TPA sends medical forms and reports to insurer." },
      { step: '3', title: "Review", desc: "Insurer reviews history and grants initial approval in 2h." },
      { step: '4', title: "Discharge", desc: "Get discharged; insurer settles final approved bills directly." },
      { step: '5', title: "Follow-up Claim", desc: "Submit bills for post-hospitalization medicines within 30 days." }
    ],
    rejectionReasons: [
      { reason: "Hidden Pre-existing Disease", desc: "Omitting parent's history of diabetes or cardiac stents during application." },
      { reason: "Policy Lapse", desc: "Failing to renew the policy on time, leaving parents uninsured during medical events." },
      { reason: "Failing to declare habits", desc: "Failing to declare smoking or alcohol habits of parents." },
      { reason: "Capped Surgeries Overrun", desc: "Excessive billing for surgeries that have sub-limit caps (like cataract)." }
    ],
    premiumFactors: [
      { factor: "Parents' Age", desc: "Premium increases with the age of the parents." },
      { factor: "Sum Insured", desc: "Higher sum assured options (e.g. ₹20 Lakhs) require higher premium." },
      { factor: "Co-payment selection", desc: "Choosing a co-pay clause reduces yearly premium cost." },
      { factor: "Pre-existing Disease", desc: "PED increases risk and might require loaded premiums." }
    ],
    terms: [
      { term: "Sum Insured", desc: "The maximum amount the insurer pays in a policy year." },
      { term: "Co-pay", desc: "Percentage of the claim bill you pay out of pocket." },
      { term: "Sub-limits", desc: "Capping on specific treatments (like ₹50,000 for cataracts)." },
      { term: "AYUSH", desc: "Alternative medicines covered under hospitalization." }
    ],
    documents: [
      "Parent's Health Card",
      "Claim form signed by parent/child",
      "Discharge summary",
      "Original pharmacy bills, diagnostic reports, and hospital bills",
      "Cancelled cheque copy for claim transfer"
    ],
    faqs: [
      { q: "Why buy a dedicated Parent Health Insurance?", a: "It ensures your parents have independent, high-value coverage that is not linked to your employer and won't get exhausted by other family members." },
      { q: "What is the maximum entry age for parents?", a: "Most plans cover entry up to 75-80 years, with some insurers having no maximum entry age limit." },
      { q: "Is tax benefit available for parent policies?", a: "Yes, you can claim a deduction up to ₹50,000 under Section 80D if your parents are senior citizens." },
      { q: "Does it cover pre-existing diseases?", a: "Yes, all pre-existing diseases are covered after a waiting period (typically 2 to 4 years)." },
      { q: "What is a co-pay in parent health insurance?", a: "It is a clause where you agree to pay a fixed percentage of each claim bill (e.g., 10% or 20%) to keep premium rates affordable." },
      { q: "Can I insure my mother and father together?", a: "Yes, you can buy a parent floater plan where both share a single sum insured." },
      { q: "Is medical screening mandatory for parents?", a: "For parents above 45-50 years, pre-policy medical checkups are generally required." },
      { q: "Are cataract surgeries covered?", a: "Yes, cataracts are covered under daycare, but usually subject to a sub-limit (like ₹30,000-₹50,000 per eye)." },
      { q: "Does it cover alternative treatments like Ayurveda?", a: "Yes, AYUSH treatments are covered if taken at government-approved hospitals." },
      { q: "What is policy portability?", a: "It is the ability to transfer your parent's policy to another insurer without losing waiting period credits." },
      { q: "What is domiciliary hospitalization?", a: "Hospitalization at home under medical supervision when the patient is too ill to move or hospital beds are full." },
      { q: "Are ambulance charges covered?", a: "Yes, emergency road ambulance expenses are covered up to a specified limit." },
      { q: "What happens if my parents have diabetes?", a: "They can still get insured. The policy will cover diabetes-related issues after the PED waiting period." },
      { q: "Can I renew the policy lifetime?", a: "Yes, IRDAI mandates lifelong renewability for all health insurance plans in India." },
      { q: "How do I choose the best parent health plan on PolicyPerfect?", a: "Compare multiple plans side-by-side based on premium, waiting periods, co-pay clauses, and network hospitals." }
    ],
    seoContent: "Securing your parents' health is the best way to return their care. Parent Health Insurance provides a financial cushion during medical emergencies, ensuring they receive the best treatment without stress. PolicyPerfect lists top-rated parent health policies from leading insurers. Compare premiums, co-pay clauses, room rent limits, and network hospital locations. Get free expert guidance and buy the policy online in a few clicks."
  },
  travel: {
    title: "Travel Insurance",
    sub: "Explore the World Worry-Free with Global Travel Protection",
    icon: Plane,
    color: "sky",
    bgImg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy international travel insurance online. Secure cashless emergency hospitalization, trip cancellation cover, baggage loss compensation, and lost passport support.",
    desc: "Secure your domestic or international trips. Travel insurance provides emergency medical assistance, baggage loss cover, and trip cancellation protection so you can fly with peace of mind.",
    badges: [
      { label: "Global Cashless Care", sub: "24/7 TPA Helpline", icon: Shield },
      { label: "Baggage & Passport", sub: "Loss compensation", icon: Shield },
      { label: "Flight Delays", sub: "Trip delay cover", icon: Clock },
      { label: "Mandatory Cover", sub: "Schengen visa approved", icon: CheckCircle2 }
    ],
    whatIs: "Travel Insurance is a specialized insurance plan designed to cover financial risks, medical emergencies, and travel-related losses that occur while traveling domestic or internationally. It serves as a safety net against flight delays, lost baggage, medical evacuations, passport loss, and trip cancellations.",
    whyImportant: "Medical treatments in foreign countries like the US or Europe are extremely expensive and can cost thousands of dollars. Travel insurance ensures you get cashless medical care. It is also a mandatory requirement for securing a visa to many countries (such as Schengen states).",
    whoShouldBuy: "Leisure travelers, business professionals, students flying abroad for higher studies, and families taking vacation trips.",
    variants: [
      { name: "Single Trip Travel Insurance", desc: "Covers a single round-trip journey from India. Best for occasional holidaymakers.", example: "A 10-day policy for a family trip to Dubai." },
      { name: "Multi-Trip Annual Policy", desc: "Covers multiple international trips taken within a year. Saves time and money for frequent flyers.", example: "Best for business executives traveling abroad every month." },
      { name: "Student Travel Insurance", desc: "Long-term policy designed for students studying abroad. Covers study interruption, sponsor protection, and medical expenses.", example: "A 2-year policy for a student heading to the USA." }
    ],
    features: [
      { title: "Emergency Medical Cover", desc: "Cashless hospitalization and treatment for illness or injury while abroad." },
      { title: "Trip Delay & Interruption", desc: "Reimbursement for hotel stay and meals if your flight is delayed by more than 12 hours." },
      { title: "Baggage Loss/Delay Cover", desc: "Financial compensation to buy essential items if your checked-in baggage is lost or delayed by airlines." }
    ],
    covered: [
      "Emergency medical hospitalization and surgery costs abroad",
      "Emergency medical evacuation back to India",
      "Repatriation of mortal remains",
      "Loss of passport and official documents (reimburses replacement cost)",
      "Total loss or delay of checked-in baggage by carrier",
      "Trip cancellation or trip interruption due to emergencies",
      "Personal liability (accidental damage to third-party property abroad)",
      "Daily cash allowance during hospitalization"
    ],
    notCovered: [
      "Pre-existing medical conditions (unless life-threatening emergency)",
      "Traveling against the advice of a certified physician",
      "Losses due to war, civil unrest, or nuclear perils",
      "Injuries sustained during adventure sports (unless specific rider purchased)",
      "Loss of baggage/valuables left unattended in public places",
      "Suicide, self-inflicted injuries, or substance abuse consequences"
    ],
    claimTimeline: [
      { step: "1", title: "Emergency", desc: "Accident, illness, or baggage loss occurs abroad." },
      { step: '2', title: "Call Helpline", desc: "Contact the 24/7 global TPA hotline printed on your policy." },
      { step: '3', title: "TPA Guidance", desc: "TPA registers claim and directs you to nearest network clinic." },
      { step: '4', title: "Submit Proofs", desc: "Submit bills, flight delay certificates, or police reports." },
      { step: '5', title: "Settlement", desc: "TPA settles hospital bills directly or reimburses other expenses." }
    ],
    rejectionReasons: [
      { reason: "Failing to Notify TPA", desc: "Getting treatment at a hospital without informing the TPA helpline within 24 hours." },
      { reason: "Adventure Sports without Rider", desc: "Claiming for leg fracture sustained during skydiving/scuba diving without an active rider." },
      { reason: "Negligence in Baggage Care", desc: "Losing your passport or wallet at a hotel lobby due to personal negligence." },
      { reason: "Pre-existing Disease Link", desc: "Hospitalization caused by chronic diabetes issues not declared beforehand." }
    ],
    premiumFactors: [
      { factor: "Destination Country", desc: "Countries with high healthcare costs (USA/Canada) have higher premiums." },
      { factor: "Duration of Trip", desc: "Longer trip durations require higher premium coverage." },
      { factor: "Age of Travellers", desc: "Older travelers have higher medical risks, increasing policy rates." },
      { factor: "Sum Insured Chosen", desc: "Higher sum assured options ($50k, $100k, $500k) have higher premiums." }
    ],
    terms: [
      { term: "TPA", desc: "Third-Party Administrator handling global medical networks and claims." },
      { term: "Deductible", desc: "The initial minor amount of a claim that you must pay yourself before the insurer pays." },
      { term: "Schengen Visa", desc: "A visa requiring travel insurance with minimum €30,000 medical cover." },
      { term: "Loss of Passport", desc: "Coverage for costs of getting a duplicate/emergency passport abroad." }
    ],
    documents: [
      "Copy of Travel Insurance Policy",
      "Passport copies with exit/entry stamps",
      "Original hospital discharge summary and medical bills",
      "Flight delay/cancellation certificate from the airline",
      "Property Irregularity Report (PIR) from airline for lost baggage",
      "Police report (FIR) for lost passport/theft claims"
    ],
    faqs: [
      { q: "Is travel insurance mandatory for international travel?", a: "It is mandatory for Schengen countries, UAE, Turkey, and several others. It is highly recommended for all countries due to high healthcare costs." },
      { q: "What does international travel insurance cover?", a: "It covers emergency medical expenses, baggage loss/delay, passport loss, trip delays, trip cancellations, and personal liability." },
      { q: "How do I make a cashless medical claim abroad?", a: "In an emergency, call your insurer's 24/7 international helpline. They will guide you to a network hospital and issue a guarantee of payment." },
      { q: "Does travel insurance cover pre-existing conditions?", a: "No, standard travel policies exclude pre-existing diseases. They only cover life-threatening complications of pre-existing conditions." },
      { q: "Can I extend my travel insurance while abroad?", a: "Yes, you can extend your policy online before the current policy expires, subject to approval from the insurer." },
      { q: "Are adventure sports covered?", a: "Standard plans do not cover adventure sports. You must choose an optional adventure sports rider if you plan to ski or skydive." },
      { q: "What should I do if the airline loses my baggage?", a: "File a Property Irregularity Report (PIR) at the airline's baggage counter immediately, and notify your insurance company." },
      { q: "What is a deductible in travel insurance?", a: "It is the initial amount of any claim (e.g. $50 or $100) that you must pay out of pocket before the insurer covers the rest." },
      { q: "Does travel insurance cover flight cancellations?", a: "Yes, if the flight is cancelled due to weather, strike, or natural disasters, the policy reimburses non-refundable bookings." },
      { q: "Can I cancel my travel insurance policy if my trip is cancelled?", a: "Yes, you can cancel the policy before the start date and get a refund after deducting a small administration fee." },
      { q: "Are students covered under normal travel insurance?", a: "Students should buy specialized Student Travel Insurance which includes study interruption, medical cover, and sponsor protection." },
      { q: "Does travel insurance cover loss of cash?", a: "Standard travel insurance does not cover loss of physical cash or currency, but some plans cover mugging/theft of wallet." },
      { q: "Is COVID-19 covered under international travel insurance?", a: "Yes, most travel policies cover medical emergencies and hospitalization due to COVID-19 while traveling." },
      { q: "What is the maximum duration of a single-trip policy?", a: "Most insurers offer single-trip coverage for up to 180 days, which can be extended for another 180 days." },
      { q: "How do I buy travel insurance online?", a: "Simply enter your destination, travel dates, traveller details on PolicyPerfect, compare quotes, and buy instantly." }
    ],
    seoContent: "International travel insurance is your passport to a worry-free vacation. Medical emergencies abroad can run into thousands of dollars, causing massive financial distress. PolicyPerfect helps you compare and buy international travel insurance from top insurers like Tata AIG, Care Health, and ICICI Lombard. Compare plans for Schengen visas, US travel, or Asian holidays. Secure coverage for baggage loss, trip delays, passport loss, and emergency medical costs instantly online."
  },
  group: {
    title: "Group Health Insurance",
    sub: "Custom Corporate Health Plans for Employees",
    icon: HeartHandshake,
    color: "teal",
    bgImg: "https://images.unsplash.com/photo-1521737711867-e3b904737c88?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Best group health insurance plans for employees and corporates. Corporate health benefits, cashless network hospitals, no waiting period for PED, and employee tax savings.",
    desc: "Protect your employees and retain top talent with customized corporate health benefits. Covers pre-existing diseases from day one, maternity benefits, and cashless hospital care.",
    badges: [
      { label: "Employee Retention", sub: "Corporate Benefits", icon: Users },
      { label: "PED Covered Day 1", sub: "No Waiting Period", icon: Clock },
      { label: "Maternity Benefit", sub: "Built-in Cover", icon: Heart },
      { label: "Cashless Network", sub: "10,000+ Hospitals", icon: Shield }
    ],
    whatIs: "Group Health Insurance (also known as Corporate Health Insurance) is a health insurance policy taken by an employer to cover the medical expenses of employees and their dependents (spouse, children, parents). The premium is paid by the employer, and it offers standard coverages with major benefits like waiver of waiting periods and pre-existing disease coverage from day one.",
    whyImportant: "It is one of the most valued employee benefits, helping businesses recruit and retain top talent. It ensures employees have peace of mind regarding medical emergencies, leading to increased productivity. It also offers tax benefits for businesses as a business expense.",
    whoShouldBuy: "SMEs, startups, corporates, and business owners looking to insure their workforce (minimum 7 to 10 employees required).",
    variants: [
      { name: "Employer-Employee Group Cover", desc: "The standard policy taken by an employer for employees.", example: "A startup covering its 15 employees." },
      { name: "Non-Employer Group Plan", desc: "Policies taken by groups like bank account holders, housing societies, or associations.", example: "A bank offering group health cover to its depositors." }
    ],
    features: [
      { title: "No Waiting Period", desc: "Pre-existing diseases and specified illnesses are covered from day one of the policy." },
      { title: "Maternity & Newborn Cover", desc: "Covers pregnancy expenses, normal and C-section deliveries, and baby expenses from birth." },
      { title: "Parent Cover Rider", desc: "Option to include employees' parents under the floater cover for total family care." }
    ],
    covered: [
      "In-patient hospitalization costs of employees and families",
      "Pre and post-hospitalization medical bills",
      "Daycare treatments and surgeries",
      "Maternity expenses (delivery, pre-natal, post-natal care)",
      "Newborn baby coverage from day one",
      "Emergency ambulance service charges",
      "Pre-existing diseases (no waiting period)"
    ],
    notCovered: [
      "Cosmetic, plastic, or aesthetic surgeries",
      "Dental treatments (unless due to accident/hospitalization)",
      "Suicide attempts, self-inflicted injuries, or drug abuse",
      "Experimental or unproven medical treatments",
      "Non-medical items (hospital food charges, administrative fees)",
      "Treatments taken outside the geographical borders of India"
    ],
    claimTimeline: [
      { step: "1", title: "Hospital Admission", desc: "Employee presents corporate health card at network hospital." },
      { step: '2', title: "TPA Request", desc: "Hospital desk sends cashless request and ID proof to TPA." },
      { step: '3', title: "TPA Review", desc: "TPA confirms employee eligibility and sum insured status." },
      { step: '4', title: "Approval", desc: "TPA issues cashless approval; treatment proceeds." },
      { step: '5', title: "Settlement", desc: "Approved bills are settled directly; employee only pays non-medical parts." }
    ],
    rejectionReasons: [
      { reason: "Employee Resignation", desc: "Trying to claim after leaving the company (policy is terminated)." },
      { reason: "Sum Insured Exhausted", desc: "Claim amount exceeding the corporate sum assured limit." },
      { reason: "Excluded Dependent", desc: "Claiming for a family member who was not registered in the employee database." },
      { reason: "Non-payable charges", desc: "Exorbitant non-medical charges in the hospital bill." }
    ],
    premiumFactors: [
      { factor: "Group Size", desc: "Larger groups enjoy lower per-member premiums due to bulk risk sharing." },
      { factor: "Demographics / Average Age", desc: "Groups with younger employee profiles pay lower premiums." },
      { factor: "Add-on Covers taken", desc: "Including maternity, parent cover, or OPD increases premium." },
      { factor: "Past Claim History", desc: "High claim ratios in previous years increase renewal premiums." }
    ],
    terms: [
      { term: "Corporate Buffer", desc: "An extra pool of sum insured used if an employee's personal cover is exhausted." },
      { term: "TPA", desc: "Agency handling cashless approvals and processing employee claims." },
      { term: "Floater Cover", desc: "Sum insured shared among the employee, spouse, and children." },
      { term: "Waiver of Waiting Period", desc: "Removing the standard 30-day or 1-year waiting periods for treatments." }
    ],
    documents: [
      "Employee Health Card / TPA ID card",
      "Claim Form signed by employee",
      "Discharge Summary from hospital",
      "Original hospital bills and receipts",
      "Doctor prescriptions and lab reports",
      "Company ID Card copy"
    ],
    faqs: [
      { q: "What is Group Health Insurance?", a: "It is a health insurance policy purchased by an employer to cover the medical costs of employees and their families." },
      { q: "What is the minimum group size required?", a: "Generally, a minimum of 7 to 10 employees is required to buy a group health policy." },
      { q: "Are pre-existing diseases covered from day one?", a: "Yes, most group health plans waive the standard waiting periods, covering pre-existing diseases from day one." },
      { q: "Does the employee pay the premium?", a: "No, the premium is paid by the employer. However, employees can choose to pay extra for top-up covers." },
      { q: "Is maternity cover included?", a: "Yes, maternity cover is a very common built-in feature in group health plans, covering delivery costs." },
      { q: "What happens to the cover if an employee resigns?", a: "The coverage stops immediately upon resignation or termination. Some insurers allow converting it to an individual policy." },
      { q: "Can parents of employees be covered?", a: "Yes, employers can opt for parent cover riders to include employees' parents under the plan." },
      { q: "What is a corporate buffer?", a: "It is a reserve fund created by the employer to help employees who exhaust their sum insured during critical medical emergencies." },
      { q: "Is tax benefit available for employers?", a: "Yes, premiums paid by employers are fully deductible as business expenses under the Income Tax Act." },
      { q: "Are dental treatments covered?", a: "Standard plans exclude dental, but corporate plans can include it as an optional OPD add-on." },
      { q: "How do employees track network hospitals?", a: "Employees can check the TPA portal or website to find the list of active network hospitals in their city." },
      { q: "What is the sum insured limit per employee?", a: "The sum insured is decided by the employer, usually ranging from ₹1 Lakh to ₹5 Lakhs or more based on designation." },
      { q: "Can employees buy top-up plans on corporate policy?", a: "Yes, employees can purchase super top-up plans to increase their coverage limit at very low rates." },
      { q: "How do employees file reimbursement claims?", a: "If treated at a non-network hospital, employees submit original bills, discharge summary, and prescriptions to the TPA." },
      { q: "Why choose PolicyPerfect for Group Health?", a: "We help design customized benefits, negotiate competitive premiums with top insurers, and offer dedicated helpdesk support for employee claims." }
    ],
    seoContent: "Group Health Insurance is a powerful tool to secure your workforce and boost employee loyalty. Custom corporate health benefits cover employees and their dependents against hospital bills, maternity costs, and accidents. At PolicyPerfect, we help SMEs, startups, and large corporates design tailored health insurance plans from top insurers like Care Health, Star Health, and Niva Bupa. Enjoy benefits like day-one cover for pre-existing diseases, maternity extensions, and corporate buffers. Compare quotes, customize features, and launch your employee benefit plan online."
  },
  home: {
    title: "Home Insurance",
    sub: "Comprehensive Protection for Your Structure & Belongings",
    icon: Home,
    color: "amber",
    bgImg: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy the best home insurance online. Protect your house structure, furniture, and appliances against fire, theft, earthquakes, and floods. Get instant quotes online.",
    desc: "Safeguard your most valuable asset. Home insurance protects your building structure and personal belongings from fire, floods, theft, and natural disasters.",
    badges: [
      { label: "Structure Cover", sub: "Building Protection", icon: Home },
      { label: "Contents Cover", sub: "Appliances & Furniture", icon: Shield },
      { label: "Natural Calamities", sub: "Earthquake/Flood cover", icon: AlertTriangle },
      { label: "Burglary Cover", sub: "Theft Protection", icon: Banknote }
    ],
    whatIs: "Home Insurance (also known as houseowners insurance) is a type of property insurance that covers private residences. It provides financial compensation against loss or damage to your home's structure (walls, roof, foundation) and its contents (appliances, jewelry, furniture) caused by fire, theft, natural disasters, and vandalism.",
    whyImportant: "Building a home requires a lifetime of savings, and any major disaster like a flood, earthquake, or fire can ruin you financially. Home insurance ensures you have the funds to rebuild your home or replace valuable contents without starting from scratch.",
    whoShouldBuy: "Homeowners (for both structure and contents) and tenants (for contents cover only) who want to secure their residence and belongings.",
    variants: [
      { name: "Structure Only Cover", desc: "Covers only the physical building structure of the house against damages.", example: "Best for landlords renting out their properties." },
      { name: "Contents Only Cover", desc: "Covers personal belongings inside the house like electronics, furniture, clothes, and jewelry.", example: "Best for tenants living in rented apartments." },
      { name: "Comprehensive Home Insurance", desc: "Covers both the building structure and all contents inside.", example: "Best for homeowners plying in self-occupied houses." }
    ],
    features: [
      { title: "Natural Disaster Cover", desc: "In-built cover for damages caused by earthquakes, floods, cyclones, and landslides." },
      { title: "Burglary & Theft", desc: "Covers loss of valuable items, electronic equipment, and cash in case of house break-ins." },
      { title: "Alternate Accommodation", desc: "Pays for your rent and relocation costs if your home is damaged and uninhabitable during repairs." }
    ],
    covered: [
      "Fire, explosion, implosion, and lightning damage",
      "Earthquake and volcanic eruption",
      "Storm, cyclone, typhoon, tempest, and flood damage",
      "Landslides and rockslides",
      "Theft, burglary, housebreaking, and malicious damage",
      "Impact damage by road/rail vehicles or aircraft",
      "Bursting or overflowing of water tanks and pipes"
    ],
    notCovered: [
      "Normal wear and tear or gradual depreciation of the building",
      "Damage due to war, invasion, or nuclear chemical exposure",
      "Loss of cash, gold bullion, or undeclared high-value art",
      "Loss of property unoccupied for more than 30 consecutive days",
      "Wilful destruction of property by the owner",
      "Loss or damage to land (only building is covered)"
    ],
    claimTimeline: [
      { step: "1", title: "Report Incident", desc: "Inform the police (for theft) and notify your insurer within 24 hours." },
      { step: '2', title: "Surveyor Appointment", desc: "Insurer assigns a surveyor to physically inspect the damage." },
      { step: '3', title: "Documentation", desc: "Provide FIR, purchase invoices, repair estimates, and photos." },
      { step: '4', title: "Assessment", desc: "Surveyor calculates replacement or repair costs." },
      { step: '5', title: "Disbursal", desc: "Claim is approved and funds are disbursed to cover repairs." }
    ],
    rejectionReasons: [
      { reason: "Unoccupied Home", desc: "Leaving the house empty for more than 30 days without informing the insurer." },
      { reason: "Poor Maintenance", desc: "Damage caused by building collapse due to old, dilapidated structure neglect." },
      { reason: "Under-insurance", desc: "Declaring a lower building value than actual construction cost to save premium." },
      { reason: "Failing to file FIR", desc: "Not filing a police FIR in case of theft or burglary claims." }
    ],
    premiumFactors: [
      { factor: "Cost of Construction", desc: "Calculated as built-up area multiplied by local construction rate per sq ft." },
      { factor: "Value of Contents", desc: "Total market value of furniture, appliances, and items insured." },
      { factor: "Location", desc: "Properties in earthquake/flood-prone zones have slightly higher premiums." },
      { factor: "Age of Property", desc: "Older buildings might have higher premium rates due to structural risks." }
    ],
    terms: [
      { term: "Reinstatement Value", desc: "Cost of rebuilding the house using similar materials without deducting depreciation." },
      { term: "Burglary", desc: "Theft involving illegal entry into the property by force or threat." },
      { term: "Structure Cover", desc: "Insurance covering the walls, floor, and roof of the building." },
      { term: "Alternate Accommodation", desc: "Coverage paying rent of temporary house during repairs." }
    ],
    documents: [
      "Copy of Title Deed or Rent Agreement",
      "Insurance Policy Schedule",
      "Duly filled Claim Form",
      "Photographs showing the damaged structure or empty lockers",
      "Original purchase bills or invoices for lost appliances/furniture",
      "FIR copy (mandatory for burglary and fire claims)"
    ],
    faqs: [
      { q: "What is Home Insurance?", a: "It is a property insurance policy that covers financial losses to your home structure and personal belongings from fire, theft, and natural disasters." },
      { q: "Is home insurance mandatory in India?", a: "It is not legally mandatory, but banks require it before granting home loans to protect their collateral." },
      { q: "Can tenants buy home insurance?", a: "Yes, tenants can buy 'Contents Insurance' to protect their electronic items, furniture, and appliances." },
      { q: "What is reinstatement value?", a: "It is the cost to reconstruct the damaged building with similar materials, without deducting depreciation." },
      { q: "Are jewelry and gold covered?", a: "Yes, jewelry is covered, but usually capped at a percentage of sum insured. High-value jewelry must be declared with valuation certificates." },
      { q: "Does home insurance cover earthquake and floods?", a: "Yes, natural disasters like earthquakes, floods, cyclones, and landslides are standard covered events." },
      { q: "What happens if my house is empty for a long time?", a: "If the home is empty for more than 30 consecutive days, theft claims are usually excluded unless declared beforehand." },
      { q: "How is building premium calculated?", a: "It is based on the cost of construction (built-up area x construction rate per sq ft), not the market price of the land." },
      { q: "Are fire accidents covered?", a: "Yes, fire damage from gas cylinder explosion, electrical short circuit, or lightning is fully covered." },
      { q: "What is under-insurance?", a: "Insuring your house for less than its actual construction value. In this case, claims are paid proportionally lower." },
      { q: "Does it cover temporary living costs?", a: "Yes, if the house is uninhabitable, the alternate accommodation cover pays your temporary rent." },
      { q: "What is the tenure of home insurance?", a: "For structures, you can buy multi-year policies up to 10-15 years. Contents cover is renewed every year." },
      { q: "Does it cover third-party liability?", a: "Yes, some comprehensive plans cover legal liability if a guest gets injured in your house." },
      { q: "How do I file a claim for burglary?", a: "File an FIR at the police station, list the stolen items, notify your insurer, and submit invoices/photos." },
      { q: "Can I compare and buy home insurance online?", a: "Yes, PolicyPerfect allows you to compare top insurers and secure home cover instantly." }
    ],
    seoContent: "Your home is your sanctuary, and home insurance is the best way to defend it. Whether you are a homeowner or a tenant, protecting your building and belongings is crucial. PolicyPerfect provides customized home insurance policies covering structures, appliances, jewelry, and furniture against fires, theft, and natural disasters like earthquakes or floods. Compare top policies, calculate premiums based on area and construction cost, and buy your home cover online with ease."
  },
  fire: {
    title: "Fire Insurance",
    sub: "Secure Your Business Assets against Fire & Special Perils",
    icon: Flame,
    color: "red",
    bgImg: "https://images.unsplash.com/photo-1616422285623-1466986eb7be?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Get fire insurance for businesses and commercial buildings. Shield your stock, machinery, and factory assets from fire, explosion, riot, and natural disasters.",
    desc: "Essential asset protection for warehouses, factories, and commercial shops. Covers loss of inventory, plant, and machinery against fire, explosions, and allied hazards.",
    badges: [
      { label: "Asset Protection", sub: "Machinery & Stock", icon: Shield },
      { label: "Special Perils", sub: "Riots & Strikes cover", icon: AlertTriangle },
      { label: "Loss of Profit", sub: "Business interruption", icon: Banknote },
      { label: "Tailored Plans", sub: "Custom industrial cover", icon: CheckCircle2 }
    ],
    whatIs: "Fire Insurance (Standard Fire and Special Perils policy) is a contract that covers commercial buildings, factories, warehouses, machinery, and stock against loss or damage caused by fire, lightning, explosion, implosion, and allied perils like floods, cyclones, landslides, and riots.",
    whyImportant: "A major fire can completely destroy a business's inventory, shut down operations, and lead to bankruptcy. Fire insurance provides the capital to replace machinery, purchase fresh raw materials, and rebuild physical assets, ensuring business continuity.",
    whoShouldBuy: "Shopkeepers, factory owners, SME operators, warehouse managers, and owners of commercial properties.",
    variants: [
      { name: "Specific Policy", desc: "Covers a fixed sum insured for a specific period of time. If loss occurs, the actual damage amount is paid up to the limit.", example: "Best for shops with stable inventory value." },
      { name: "Declaration Policy", desc: "For businesses with fluctuating stock values. The insured declares stock values monthly, and premium is adjusted accordingly.", example: "Best for commodity warehouses or retail distributors." }
    ],
    features: [
      { title: "Special Perils Cover", desc: "Includes damages caused by natural events like cyclones and man-made issues like riots or strikes." },
      { title: "Business Interruption", desc: "Add-on that compensates you for the loss of profits and fixed expenses while your business is shut down due to fire." },
      { title: "Removal of Debris", desc: "Covers costs incurred for clearing debris and clearing the site before reconstruction." }
    ],
    covered: [
      "Fire accidents (electrical short-circuit, gas leak, accidental ignition)",
      "Lightning strikes causing structural damage",
      "Explosion or implosion of boilers and gas containers",
      "Natural disasters (floods, inundation, cyclones, earthquakes)",
      "Riots, strikes, and malicious damages by third parties",
      "Impact damage by road/rail vehicles or aircraft",
      "Bursting or overflowing of water pipes and sprinklers"
    ],
    notCovered: [
      "Loss caused by spontaneous combustion or chemical fermentation",
      "Theft or burglary during or after the fire incident",
      "Damage to stocks due to temperature changes or cold storage failure",
      "Loss or damage caused by war, invasion, or nuclear weapons",
      "Willful destruction of property by the business owner",
      "Electrical breakdown of machinery without fire"
    ],
    claimTimeline: [
      { step: "1", title: "Control Fire", desc: "Call the fire brigade immediately and try to minimize further loss." },
      { step: '2', title: "Intimate Claim", desc: "Notify your insurance provider/advisor immediately." },
      { step: '3', title: "Surveyor Visit", desc: "An IRDAI-licensed surveyor inspects the commercial site to assess loss." },
      { step: '4', title: "Submit Books", desc: "Submit fire brigade report, FIR, tax invoices, and accounting books." },
      { step: '5', title: "Settlement", desc: "Approved claim is disbursed to rebuild premises and replace stocks." }
    ],
    rejectionReasons: [
      { reason: "Misdeclaration of Stock Value", desc: "Under-reporting stock levels to pay lower premiums." },
      { reason: "Spontaneous Combustion", desc: "Claims for self-heating coal/crops are excluded unless specific rider was taken." },
      { reason: "Lack of Safety Measures", desc: "Neglecting mandatory fire exit planning or lacking functional fire extinguishers." },
      { reason: "No Fire Brigade Report", desc: "Failing to submit the official report from the fire department." }
    ],
    premiumFactors: [
      { factor: "Nature of Business / Risk Class", desc: "Factories handling chemicals pay higher premiums than retail cloth shops." },
      { factor: "Value of Assets", desc: "Sum assured based on market value of stocks, machinery, and rebuilding costs." },
      { factor: "Construction Material", desc: "RCC buildings pay lower premiums than properties built with wood/corrugated sheets." },
      { factor: "Fire Safety Equipment", desc: "Having automated fire alarms, sprinklers, and hydrants reduces the premium rate." }
    ],
    terms: [
      { term: "Debris Removal", desc: "Expense of clearing ashes and rubble covered by policy." },
      { term: "Declaration Policy", desc: "Adjustable premium policy for fluctuating inventories." },
      { term: "Boiler Explosion", desc: "Coverage for physical damage caused by explosion of heating systems." },
      { term: "Business Interruption", desc: "Loss of profit cover during business downtime." }
    ],
    documents: [
      "Completed Claim Form",
      "Fire Brigade Report / Fire Certificate",
      "Police FIR copy",
      "Detailed list of damaged stocks with purchase invoices",
      "Books of accounts and audit reports for stock verification",
      "Surveyor report and repair quotations"
    ],
    faqs: [
      { q: "What is Fire Insurance?", a: "It is a commercial property policy that covers structural and stock damages from fire, explosions, and natural disasters." },
      { q: "Who should buy fire insurance?", a: "Every business owner, shopkeeper, manufacturer, and landlord leasing out commercial buildings." },
      { q: "Does it cover business loss of profit?", a: "Standard fire policies do not. You must add 'Business Interruption' cover to protect your profits during downtime." },
      { q: "What are Allied Perils?", a: "These are additional threats covered under fire policy, including cyclones, floods, earthquakes, riots, and strikes." },
      { q: "What is a Declaration Policy?", a: "A policy where you declare your stock value monthly. Best for businesses with fluctuating inventory levels." },
      { q: "Does it cover electrical damage to machinery?", a: "Only if the electrical damage resulted in a fire. Standard mechanical breakdown is excluded." },
      { q: "Is theft during a fire covered?", a: "No, theft is excluded. You need a Burglary insurance cover alongside fire policy." },
      { q: "What is debris removal cover?", a: "It pays for the expenses incurred in clearing out the burned rubble and wreckage from the site." },
      { q: "How is building value calculated?", a: "Based on the cost of reconstruction using similar materials, not the market value of the property." },
      { q: "Is spontaneous combustion covered?", a: "No, spontaneous combustion is excluded. However, you can cover it by paying a small extra premium." },
      { q: "What should I do first when a fire breaks out?", a: "Ensure safety, call the fire brigade, isolate flammable items if safe, and contact your insurer." },
      { q: "Can I get coverage for rent of alternative office?", a: "Yes, by opting for the 'Alternative Accommodation/Office Rent' add-on cover." },
      { q: "Are custom accessories and fit-outs covered?", a: "Yes, you must include the value of partitions, lighting, and interior fit-outs in the sum insured." },
      { q: "Does it cover damage from gas cylinder explosion?", a: "Yes, explosion or implosion of gas cylinders used for domestic or commercial purposes is covered." },
      { q: "Why compare fire insurance on PolicyPerfect?", a: "We analyze your industrial risks, recommend appropriate sum insured, and compare quotes from India's top commercial insurers." }
    ],
    seoContent: "Fire accidents can turn a thriving business into ashes overnight. Standard Fire and Special Perils insurance is the primary line of defense for factories, retail shops, and warehouses. PolicyPerfect helps business owners analyze their risks and compare commercial policies from top providers like ICICI Lombard, HDFC Ergo, and SBI General Insurance. Customize your plan with riders like business interruption, debris removal, and spontaneous combustion cover. Compare rates online and secure your commercial assets today."
  },
  marine: {
    title: "Marine Insurance",
    sub: "Secure Your Cargo & Goods in Transit Globally",
    icon: Anchor,
    color: "blue",
    bgImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy marine cargo insurance online. Cover import-export goods, inland transit, and cargo shipments against sea perils, theft, collision, and derailment.",
    desc: "Protect your commercial cargo against transit damages by road, rail, air, or sea. Ensure import-export compliance with comprehensive marine cargo insurance.",
    badges: [
      { label: "Global Transit Cover", sub: "Road, Rail, Air, Sea", icon: Shield },
      { label: "Import & Export", sub: "Customs Compliant", icon: CheckCircle2 },
      { label: "Theft & Damage", sub: "Full cargo protection", icon: Banknote },
      { label: "Fast Claims", sub: "Global surveyor network", icon: Clock }
    ],
    whatIs: "Marine Insurance covers the loss or damage of ships, cargo, terminals, and any transport by which property is transferred between the points of origin and final destination. For businesses, Marine Cargo Insurance is the most common form, covering goods in transit across international seas, domestic inland waterways, railways, roads, and air routes.",
    whyImportant: "Cargo transit is exposed to severe risks like shipwreck, pirate attacks, truck collisions, derailment, cargo theft, and rough weather damage. If goods are damaged during transit, the financial loss falls on the buyer or seller. Marine insurance ensures that your transit capital is fully protected.",
    whoShouldBuy: "Exporters, importers, manufacturing firms, wholesale traders, logistics operators, and custom house agents.",
    variants: [
      { name: "Marine Cargo Insurance", desc: "Covers the goods being transported against damages during transit.", example: "Best for exporters shipping goods to Europe." },
      { name: "Hull Insurance", desc: "Covers the physical ship, vessel, or machinery against damage.", example: "Purchased by shipping line owners." },
      { name: "Inland Transit Cover", desc: "Covers goods transported within the geographical boundaries of India via road/rail.", example: "Best for domestic wholesale distributors." }
    ],
    features: [
      { title: "Open Policy", desc: "A one-year policy that automatically covers all shipments made during the period. Eliminates buying a policy for every trip." },
      { title: "Single Voyage Policy", desc: "Covers a single specific transit trip from origin to destination." },
      { title: "All Risks Cover (ICC A)", desc: "The highest level of cargo coverage, protecting against all physical damage risks unless explicitly excluded." }
    ],
    covered: [
      "Physical damage due to collisions, derailment, or crashes",
      "Sinking, stranding, or grounding of the vessel at sea",
      "Fire, explosion, and lightning damage to cargo",
      "Theft, burglary, pilferage, and non-delivery of cargo",
      "Jettisoning (throwing cargo overboard to save the ship)",
      "Natural calamities (tsunami, volcanic eruption, earthquake)",
      "General average contributions (shared cost of saving ship)"
    ],
    notCovered: [
      "Loss due to improper or insufficient packaging of goods",
      "Inherent vice (decay or spoilage of perishable goods like fruits)",
      "Losses due to delay in transit (demurrage charges)",
      "Willful misconduct or fraud by the policyholder",
      "War, strikes, riots (unless specific add-on taken)",
      "Insolvency or financial default of the shipping line"
    ],
    claimTimeline: [
      { step: "1", title: "Damage Detected", desc: "Inspect goods immediately upon receipt; report discrepancies." },
      { step: '2', title: "Notify TPA/Insurer", desc: "File claim notice within 24 hours of receiving cargo." },
      { step: '3', title: "Surveyor inspection", desc: "Insurer assigns a marine surveyor to inspect cargo at port/warehouse." },
      { step: '4', title: "Document Submission", desc: "Submit Bill of Lading, invoice, packing list, and damage report." },
      { step: '5', title: "Disbursal", desc: "Claim settled based on invoice value and shipping terms." }
    ],
    rejectionReasons: [
      { reason: "Bad Packaging", desc: "Cargo damaged because of thin cardboard boxes or wet wooden pallets." },
      { reason: "Inherent Vice", desc: "Perishable vegetables decaying during a delayed journey." },
      { reason: "Delay in reporting", desc: "Notifying the insurer weeks after the cargo cleared the port." },
      { reason: "Unapproved Routes", desc: "Vessel taking illegal or war-zone shipping routes not declared in policy." }
    ],
    premiumFactors: [
      { factor: "Type of Goods", desc: "Fragile glassware or electronics have higher premiums than steel rods." },
      { factor: "Transit Route", desc: "High-risk shipping routes (piracy zones) have elevated premium rates." },
      { factor: "Shipping Mode", desc: "Air transit has lower damage rates and lower premiums compared to sea freight." },
      { factor: "Sum Insured (Invoice + Freight)", desc: "Calculated based on cargo value plus freight costs and 10% imaginary profit." }
    ],
    terms: [
      { term: "Bill of Lading", desc: "The official receipt issued by the carrier acknowledging cargo receipt." },
      { term: "General Average", desc: "A law requiring all cargo owners to share the cost of saving the ship." },
      { term: "Jettison", desc: "Throwing goods overboard to lighten a ship during distress." },
      { term: "Inherent Vice", desc: "Internal decay risk in goods (like rusting of iron or ripening of fruit)." }
    ],
    documents: [
      "Original Insurance Certificate / Policy",
      "Commercial Invoice and Packing List",
      "Bill of Lading / Airway Bill",
      "Joint Inspection Report / Port Damage Certificate",
      "Correspondence copy with carriers holding them responsible for loss",
      "Claim Form and Surveyor Report"
    ],
    faqs: [
      { q: "What is Marine Insurance?", a: "It is cargo and hull insurance covering physical goods and vessels during transit across land, sea, and air routes." },
      { q: "Who pays for marine insurance, buyer or seller?", a: "It depends on the Incoterms agreed in the sales contract. For CIF (Cost, Insurance, Freight), the seller pays. For FOB (Free on Board), the buyer pays." },
      { q: "What is an Open Policy?", a: "A yearly marine policy that automatically covers all cargo shipments made during the 12-month period." },
      { q: "What is Inland Transit insurance?", a: "Cargo insurance covering goods transported within India via trucks, trains, or domestic flights." },
      { q: "Is theft covered in marine cargo insurance?", a: "Yes, under standard Institute Cargo Clauses (A) plans, theft, burglary, and pilferage are fully covered." },
      { q: "What does Inherent Vice mean?", a: "It refers to the natural deterioration of goods, such as fruit spoiling, iron rusting, or coal self-heating. It is excluded from standard cover." },
      { q: "What is Jettison in shipping?", a: "The act of throwing cargo overboard during emergencies to reduce ship weight and prevent sinking. This loss is covered by marine insurance." },
      { q: "Are delay damages covered?", a: "No, financial losses due to transit delays or market price changes are excluded." },
      { q: "How is the sum insured calculated for cargo?", a: "It is calculated as: Cargo Invoice Value + Freight Charges + 10% (imaginary profit margin to cover admin costs)." },
      { q: "What is a Bill of Lading?", a: "A legal document issued by the carrier containing details of cargo, acting as a title of goods and transport contract." },
      { q: "What should I do if cargo arrives damaged?", a: "Note the damage on the delivery receipt, take photos, file a protest letter to the shipping line, and contact your insurer." },
      { q: "Does marine insurance cover war risks?", a: "Standard policies exclude war and strikes, but you can cover them by adding the 'War and Strike Perils' rider." },
      { q: "Can I get cargo insurance for a single shipment?", a: "Yes, this is called a Single Voyage policy, designed for occasional shipments." },
      { q: "Is custom duty covered?", a: "Yes, you can add custom duty cover as an add-on to ensure you don't lose the duty paid if goods are damaged after custom clearance." },
      { q: "Why purchase marine insurance via PolicyPerfect?", a: "We specialize in structuring Open Policies, understanding Incoterms, and ensuring smooth claim handling through global surveyor networks." }
    ],
    seoContent: "Marine Cargo Insurance is the lifeblood of international and domestic trade. Whether you export luxury garments by air or transport steel coils by railway, cargo transit is exposed to severe risks. PolicyPerfect simplifies marine insurance by comparing quotes from top-rated insurers. Protect your goods from port-to-port and warehouse-to-warehouse. Compare policies, understand complex Incoterms, and buy cargo cover online."
  },
  cyber: {
    title: "Cyber Insurance",
    sub: "Shield Your Digital Business from Data Breaches & Cyber Crime",
    icon: Shield,
    color: "purple",
    bgImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Protect your business from ransomware, data breaches, phishing, and digital liability. Compare cyber insurance policies and buy online.",
    desc: "Protect your business from evolving digital threats. Cyber insurance covers ransomware extortion, data breach recovery, forensic investigations, and legal liability.",
    badges: [
      { label: "Ransomware Cover", sub: "Extortion Protection", icon: Banknote },
      { label: "Data Recovery", sub: "System Restoration", icon: Clock },
      { label: "Legal Liability", sub: "Defence Costs & Fines", icon: Shield },
      { label: "24/7 Response", sub: "Incident Hotline", icon: CheckCircle2 }
    ],
    whatIs: "Cyber Insurance (Cyber Liability Insurance) is a contract designed to help businesses mitigate risk exposure by offsetting recovery costs associated with cyber damage, ransomware extortion, data breaches, phishing scams, malware infections, and business interruption resulting from system hacks.",
    whyImportant: "A data breach or ransomware attack can cost a business millions of rupees, damage brand reputation, and invite regulatory fines. Cyber insurance provides access to expert forensic teams, pays for legal defense, covers ransomware payouts, and replaces lost revenue during system downtime.",
    whoShouldBuy: "IT firms, e-commerce portals, banks, hospitals, retail shops, and any business that handles customer data, passwords, or processes online payments.",
    variants: [
      { name: "First-Party Cyber Coverage", desc: "Covers direct financial losses suffered by your business.", example: "Pays for data recovery, forensic audits, ransomware, and business downtime loss." },
      { name: "Third-Party Cyber Coverage", desc: "Covers liabilities if your customers' data is leaked and they sue your company.", example: "Covers legal fees, class-action lawsuits, and regulatory penalties." }
    ],
    features: [
      { title: "Ransomware & Extortion Cover", desc: "Covers ransom demands, negotiation costs, and IT recovery fees." },
      { title: "Forensic Investigation", desc: "Pays for cybersecurity firms to audit and find the security loophole." },
      { title: "Business Interruption", desc: "Compensates for lost revenue while system networks are offline." }
    ],
    covered: [
      "Ransomware Extortion Payments",
      "Data Breach Notification Costs",
      "IT Forensics & Recovery Expenses",
      "Loss of Business Income during attack",
      "Regulatory Fines & Legal Defence Costs",
      "Media Liability (Infringement, Defamation)"
    ],
    notCovered: [
      "Breaches occurred prior to policy start date",
      "Loss of prospective future profits or IP value",
      "Failure to maintain reasonable security measures",
      "Utility or infrastructure outages (broadband/power)",
      "Costs to upgrade systems after a breach"
    ],
    claimTimeline: [
      { step: "1", title: "Breach Detected", desc: "Identify system compromise or extortion demand." },
      { step: '2', title: "Call Response Team", desc: "Contact the 24/7 cyber incident hotline immediately." },
      { step: '3', title: "Forensic Audit", desc: "Security experts analyze the breach and contain it." },
      { step: '4', title: "Legal & PR Action", desc: "Notify affected users and regulators as per law." },
      { step: '5', title: "Recovery & Settlement", desc: "Insurers cover the recovery costs and liability payouts." }
    ],
    rejectionReasons: [
      { reason: "Undisclosed Past Incidents", desc: "Failing to disclose active server compromises during policy purchase." },
      { reason: "Negligent IT Security", desc: "Lacking basic antivirus, firewalls, or using outdated operating systems without patches." },
      { reason: "Failing to Notify Insurer", desc: "Attempting to negotiate or pay ransom before notifying the insurer." },
      { reason: "Hardware wear and tear", desc: "System crash due to old servers rather than cyber attack." }
    ],
    premiumFactors: [
      { factor: "Nature of Business", desc: "Banks and medical clinics holding critical customer data pay higher premiums." },
      { factor: "Annual Revenue", desc: "Higher turnover indicates larger business scale and higher target risk." },
      { factor: "Existing Cybersecurity Controls", desc: "Using multi-factor authentication (MFA) and encryption reduces premium." },
      { factor: "Number of Employees", desc: "More employees increase risk of human error and phishing attacks." }
    ],
    terms: [
      { term: "Ransomware", desc: "Malicious software locking system access until money is paid." },
      { term: "Data Breach", desc: "Unauthorized copy or extraction of private customer records." },
      { term: "Business Interruption", desc: "Income loss during system network outage." },
      { term: "Forensics", desc: "Investigation to identify security loopholes." }
    ],
    documents: [
      "Completed Cyber Risk Questionnaire",
      "Network Security Audit report",
      "Details of the cyber incident and TPA notification log",
      "FIR copy registered at the cyber cell",
      "Invoices for forensic expenses and recovery costs",
      "Legal summons or regulatory fine notices"
    ],
    faqs: [
      { q: "Who needs cyber insurance?", a: "Any business that stores customer data, processes online payments, or relies heavily on digital systems should have cyber insurance to cover the massive costs of data breaches or ransomware." },
      { q: "Does cyber insurance cover social engineering like phishing?", a: "Phishing and social engineering covers are often available as add-ons or built-in benefits depending on the carrier and policy selected." },
      { q: "What is ransomware cover?", a: "Ransomware cover pays for extortion demands, negotiation support, and system restoration costs after a ransomware attack." },
      { q: "Does it cover reputational damage?", a: "Yes, most policies cover costs for hiring PR firms to manage brand reputation and public communications after a breach." },
      { q: "What is first-party vs third-party cyber insurance?", a: "First-party covers your own business losses (data recovery, business interruption). Third-party covers legal claims from customers whose data was leaked." },
      { q: "Does cyber insurance cover regulatory fines?", a: "Yes, it covers GDPR, DPDP (Digital Personal Data Protection Act India) fines, and associated legal defense expenses." },
      { q: "Can individuals buy cyber insurance?", a: "Yes, individual cyber policies are available to protect against online financial fraud, identity theft, and cyberstalking." },
      { q: "Are pre-existing breaches covered?", a: "No, breaches that occurred before the policy purchase date are strictly excluded." },
      { q: "What cybersecurity controls are required to get insured?", a: "Insurers look for Multi-Factor Authentication (MFA), regular offline backups, active firewalls, and employee training." },
      { q: "Is business interruption covered?", a: "Yes, the policy compensates for loss of profits during system downtime caused by a hack." },
      { q: "Does it cover hardware theft?", a: "Physical theft of laptops or servers is not covered by cyber insurance. You need an Office/SME package policy for this." },
      { q: "How do I report a cyber claim?", a: "Call the emergency cyber response team immediately, freeze systems, file an official complaint at cybercrime.gov.in, and notify the insurer." },
      { q: "Why are cyber premiums increasing?", a: "Due to the massive rise in global ransomware attacks and the high costs of data recovery and legal settlements." },
      { q: "Does it cover intellectual property theft?", a: "Standard cyber policies exclude loss of future profits from stolen IP or trade secrets." },
      { q: "Why buy cyber insurance from PolicyPerfect?", a: "We help you audit your cyber risk profile, implement mandatory security controls, and compare quotes from top digital risk underwriters." }
    ],
    seoContent: "Cyber insurance is the final wall of defense for your digital enterprise. As business operations move online, threats like ransomware, data theft, and phishing scams are rising. PolicyPerfect helps you compare cyber risk policies from top underwriters. Protect your servers, databases, and customer records from unauthorized breaches. Compare quotes online and get expert advisor support to secure your company."
  },
  life: {
    title: "Term Life Insurance",
    sub: "Secure Your Family's Financial Future with Term Insurance",
    icon: Shield,
    color: "blue",
    bgImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy term life insurance online in India. Secure your family's future with high life cover at low premiums. Compare plans and get tax rebates under Section 80C.",
    desc: "Ensure your family's financial independence in your absence. Term insurance provides high coverage at very affordable premiums, securing your loved ones forever.",
    badges: [
      { label: "High Cover", sub: "Low Premiums", icon: Banknote },
      { label: "Tax Benefits", sub: "Under Sec 80C", icon: Percent },
      { label: "Claim Support", sub: "Dedicated Manager", icon: CheckCircle2 },
      { label: "Critical Illness", sub: "Add-on Covers", icon: HeartPulse }
    ],
    whatIs: "Term Life Insurance is the simplest and most cost-effective form of life insurance. It provides a high financial cover (sum assured) for a specific term (policy tenure). If the insured passes away during the policy term, the nominee receives the entire sum assured. If the insured survives the term, no maturity benefit is paid (unless it is a Return of Premium plan).",
    whyImportant: "If you are the primary breadwinner, your family depends on your income to pay for house rent, child education, food, and outstanding debts. Term insurance ensures that if you are no longer around, your family will receive a lump sum payout to maintain their lifestyle and pay off loans.",
    whoShouldBuy: "Any working professional (salaried or business owner) with financial dependents, parents, spouse, or active home/personal loans.",
    variants: [
      { name: "Pure Term Plan", desc: "The standard term insurance. High cover, low premium, no survival benefits.", example: "₹1 Crore cover for a 30-year-old at ₹800/month." },
      { name: "Term Return of Premium (TROP)", desc: "If the insured survives the policy term, all premiums paid are returned.", example: "Slightly higher premium, but guarantees money back at survival." },
      { name: "Increasing / Decreasing Term Cover", desc: "Sum assured increases with age (to beat inflation) or decreases (aligned with loan repayment).", example: "Cover starts at ₹1 Crore and grows by 5% every year." }
    ],
    features: [
      { title: "Critical Illness Rider", desc: "Get a lump sum payout if diagnosed with covered life-threatening illnesses." },
      { title: "Accidental Death Benefit", desc: "Additional sum assured payout to the nominee if death occurs due to an accident." },
      { title: "Waiver of Premium", desc: "All future premiums are waived if the insured suffers permanent disability." }
    ],
    covered: [
      "Natural death due to illnesses or old age",
      "Accidental death (collisions, falls, crashes)",
      "Death due to critical illnesses or pandemics",
      "Permanent total disability (via riders)",
      "Terminal illness (advancement of death benefit)"
    ],
    notCovered: [
      "Suicide within the first 12 months of policy start",
      "Death due to drug or alcohol abuse",
      "Death participating in adventure/hazardous sports",
      "Death resulting from war, invasion, or riots",
      "Death resulting from participation in illegal/criminal acts"
    ],
    claimTimeline: [
      { step: "1", title: "Claim Filed", desc: "Nominee submits claim intimation form to the insurer." },
      { step: '2', title: "Submit Documents", desc: "Provide death certificate, policy copy, and medical reports." },
      { step: '3', title: "Verification", desc: "Insurer verifies documents and checks claim genuineness." },
      { step: '4', title: "Approval", desc: "Claim is approved within 15-30 days of submission." },
      { step: '5', title: "Payout", desc: "Sum assured is transferred directly to nominee's bank account." }
    ],
    rejectionReasons: [
      { reason: "Non-Disclosure of Habits", desc: "Failing to disclose smoking or drinking habits during purchase." },
      { reason: "Misstatement of Income", desc: "Declaring a higher income than actual to secure larger cover." },
      { reason: "Suicide within 1 year", desc: "Suicide claims within the first policy year are rejected." },
      { reason: "Undisclosed Medical History", desc: "Hiding heart conditions, diabetes, or past surgeries." }
    ],
    premiumFactors: [
      { factor: "Age of Applicant", desc: "Premiums are lowest when bought young and rise steeply later." },
      { factor: "Smoking Habits", desc: "Smokers pay 40-70% higher premiums compared to non-smokers." },
      { factor: "Policy Term & Cover", desc: "Longer terms and larger sum assured increase premium rates." },
      { factor: "Occupation & Health", desc: "Dangerous professions or poor health records increase premiums." }
    ],
    terms: [
      { term: "Sum Assured", desc: "The total cash benefit paid to the nominee upon death." },
      { term: "Policy Term", desc: "The number of years for which the coverage remains active." },
      { term: "Rider", desc: "Additional optional benefits added to the base term policy." },
      { term: "Grace Period", desc: "Extra time (15-30 days) allowed to pay premium after due date." }
    ],
    documents: [
      "Original Death Certificate of the insured",
      "Original Insurance Policy Document",
      "Duly filled Claim Form",
      "Nominee's ID and address proof (Aadhaar, PAN)",
      "Hospital records, discharge summary, and medical reports (if death by illness)",
      "FIR and Post-Mortem Report (mandatory for accidental death)"
    ],
    faqs: [
      { q: "Who should buy Term Life Insurance?", a: "Anyone who has financial dependents (parents, spouse, children) or outstanding debts should absolutely buy term insurance." },
      { q: "What is the ideal coverage amount?", a: "A general rule of thumb is to have a life cover that is at least 15 to 20 times your current annual income." },
      { q: "What is the difference between term insurance and endowment plans?", a: "Term insurance is a pure protection plan with zero maturity value. Endowment plans combine investment and insurance, offering low cover and low returns." },
      { q: "Is tax benefit available for term life insurance?", a: "Yes, premiums qualify for deduction under Section 80C, and the claim payout to the nominee is fully tax-free under Section 10(10D)." },
      { q: "What happens if I stop paying premiums?", a: "The policy will lapse after the grace period, and your coverage will stop completely." },
      { q: "Can a smoker get term life insurance?", a: "Yes, but smokers pay higher premiums compared to non-smokers due to health risks." },
      { q: "What is the waiver of premium rider?", a: "It ensures that if you suffer permanent disability due to an accident, all future premiums are waived, while the policy stays active." },
      { q: "Does term insurance cover suicide?", a: "Suicide is covered only after completing 12 months of the policy start date." },
      { q: "Can I renew my term policy after it ends?", a: "Generally, term plans are not renewed after expiry. It is recommended to choose a term policy that covers you up to retirement age (60-65 years)." },
      { q: "What is a terminal illness benefit?", a: "If diagnosed with a terminal disease with less than 6 months to live, the insurer advances a portion of the sum assured for treatment." },
      { q: "What is the grace period?", a: "A 30-day window after the premium due date during which you can pay without losing coverage." },
      { q: "Are accidental deaths covered?", a: "Yes, accidental deaths are fully covered under standard term plans. You can add an accidental death rider for extra payout." },
      { q: "Do house wives need term insurance?", a: "Housewives do not have earned income, but some insurers offer limited cover if the husband has a valid policy." },
      { q: "Is medical checkup mandatory?", a: "Yes, most insurers require physical or tele-medical checks for term plans to assess health risks." },
      { q: "Why compare term plans on PolicyPerfect?", a: "We help you compare premiums, claim settlement ratios (CSR), and rider options from India's top insurers." }
    ],
    seoContent: "Term life insurance is the foundation of family financial planning. For a very low monthly premium, you can secure a massive life cover of ₹1 Crore or more. PolicyPerfect helps you compare and buy term plans from leading providers like LIC, HDFC Life, ICICI Prudential, and Max Life. Secure tax deductions under Section 80C, choose custom riders, and get dedicated support for your nominee during claims."
  },
  business: {
    title: "Business Insurance",
    sub: "Protect Your Business Assets, Liabilities & Operations",
    icon: Building2,
    color: "slate",
    bgImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Protect your business, factory, or SME with comprehensive commercial insurance. Covers property damage, liability, employee benefits, and business interruption.",
    desc: "Ensure your business continues to thrive. Our tailored SME and business insurance plans cover property, public liability, employee risks, and marine cargo.",
    badges: [
      { label: "Liability Protection", sub: "Comprehensive Cover", icon: Shield },
      { label: "Asset Protection", sub: "Plant & Machinery", icon: Home },
      { label: "Loss of Profits", sub: "Business Interruption", icon: Banknote },
      { label: "Quick Claims", sub: "Dedicated CRM", icon: CheckCircle2 }
    ],
    whatIs: "Business Insurance (Commercial Insurance) is a suite of insurance policies designed to protect companies, SMEs, and shops from financial losses arising from property damage, legal liability, employee injuries, business interruption, and product defects.",
    whyImportant: "Commercial operations face unpredictable risks like fire in warehouses, employee injury on shop floors, third-party liability lawsuits, and transport damage. A business insurance package secures your cash flow, pays for legal defense, and covers building/machinery restoration costs.",
    whoShouldBuy: "Shopkeepers, wholesalers, manufacturers, startups, IT consultancies, and large corporate entities.",
    variants: [
      { name: "SME Package Policy", desc: "A bundle policy covering building, stock, public liability, and burglary under one plan.", example: "Best for small retail shops and offices." },
      { name: "Liability Insurance", desc: "Covers legal liabilities if your business causes damage or injury to third parties.", example: "Best for professional consultancies or service firms." },
      { name: "Asset & Property Cover", desc: "Protects physical structures, tools, computers, and inventories.", example: "Best for factories and assembly lines." }
    ],
    features: [
      { title: "Public Liability Cover", desc: "Covers legal claims if a customer gets injured on your business premises." },
      { title: "Machinery Breakdown", desc: "Reimbursement for repairing expensive machinery after internal electrical/mechanical failure." },
      { title: "Burglary & Cash Cover", desc: "Covers theft of office contents and money kept in safe lockers." }
    ],
    covered: [
      "Property & Asset Damage (Fire, Flood)",
      "Public & Product Liability",
      "Workmen Compensation (Employee Injuries)",
      "Theft, Burglary & Money in Transit",
      "Marine Cargo & Transit Risks",
      "Machinery Breakdown Expenses"
    ],
    notCovered: [
      "Consequential financial losses",
      "Wear & tear or gradual deterioration",
      "Willful negligence or law violations",
      "War, invasion, or nuclear threats",
      "Cyber attacks (requires cyber add-on/policy)"
    ],
    claimTimeline: [
      { step: "1", title: "Report Incident", desc: "Notify the insurer/advisor immediately with details." },
      { step: '2', title: "Prevent Further Loss", desc: "Take reasonable steps to secure the remaining property." },
      { step: '3', title: "Survey & Inspection", desc: "An independent surveyor will assess the damage." },
      { step: '4', title: "Document Submission", desc: "Provide invoices, books, repair estimates, and FIR." },
      { step: '5', title: "Claim Payout", desc: "Approved claim amount is transferred to business account." }
    ],
    rejectionReasons: [
      { reason: "Misdeclaration of Stock Value", desc: "Under-reporting stock levels to pay lower premiums." },
      { reason: "Spontaneous Combustion", desc: "Claims for self-heating coal/crops are excluded unless specific rider was taken." },
      { reason: "Lack of Safety Measures", desc: "Neglecting mandatory fire exit planning or lacking functional fire extinguishers." },
      { reason: "No Fire Brigade Report", desc: "Failing to submit the official report from the fire department." }
    ],
    premiumFactors: [
      { factor: "Nature of Business / Risk Class", desc: "Factories handling chemicals pay higher premiums than retail cloth shops." },
      { factor: "Value of Assets", desc: "Sum assured based on market value of stocks, machinery, and rebuilding costs." },
      { factor: "Construction Material", desc: "RCC buildings pay lower premiums than properties built with wood/corrugated sheets." },
      { factor: "Fire Safety Equipment", desc: "Having automated fire alarms, sprinklers, and hydrants reduces the premium rate." }
    ],
    terms: [
      { term: "Debris Removal", desc: "Expense of clearing ashes and rubble covered by policy." },
      { term: "Declaration Policy", desc: "Adjustable premium policy for fluctuating inventories." },
      { term: "Boiler Explosion", desc: "Coverage for physical damage caused by explosion of heating systems." },
      { term: "Business Interruption", desc: "Loss of profit cover during business downtime." }
    ],
    documents: [
      "Completed Claim Form",
      "Fire Brigade Report / Fire Certificate",
      "Police FIR copy",
      "Detailed list of damaged stocks with purchase invoices",
      "Books of accounts and audit reports for stock verification",
      "Surveyor report and repair quotations"
    ],
    faqs: [
      { q: "What is Business Insurance?", a: "It is a suite of commercial policies protecting physical assets, inventories, employee health, and legal liability." },
      { q: "Who should buy business insurance?", a: "Every retail shop, SME, factory, startup, and corporate office owner." },
      { q: "What is Public Liability?", a: "It covers legal expenses and payouts if a customer, vendor, or guest suffers injury or damage on your office premises." },
      { q: "Does it cover machinery failure?", a: "Yes, with the 'Machinery Breakdown' add-on, you are covered for repair costs of heavy machinery." },
      { q: "What is Business Interruption cover?", a: "It compensates you for lost profits and pays fixed costs (like employee salaries) while your office is shut down for repairs." },
      { q: "Can I get one policy for all business risks?", a: "Yes, you can buy an 'SME Package Policy' which bundles fire, theft, liability, and glass breakage covers." },
      { q: "Is employee health covered?", a: "No, you must buy a separate Group Health Insurance policy to cover employee medical costs." },
      { q: "Are transit damages covered?", a: "No, you need a Marine Cargo policy to cover goods during road, rail, air, or sea transit." },
      { q: "What is under-insurance in business?", a: "Declaring asset values lower than actual. Insurers pay claims proportionally less if under-insured." },
      { q: "Does it cover employee theft?", a: "Yes, with a 'Fidelity Guarantee' cover, you are protected against fraud or theft committed by employees." },
      { q: "How is shop insurance premium calculated?", a: "Based on location, nature of trade, value of stocks, building structure type, and security systems." },
      { q: "Is earthquake cover included?", a: "Yes, standard commercial property policies include earthquakes and natural disasters as allied perils." },
      { q: "What is Director's & Officer's (D&O) liability?", a: "A specialized policy protecting company directors from personal losses if sued by shareholders or regulators." },
      { q: "How do I claim for property damage?", a: "Notify the insurer, take photos, prevent further damage, file an FIR if theft/fire, and submit invoices." },
      { q: "Why compare business plans on PolicyPerfect?", a: "We analyze your risk profile, customize features, and compare rates from top corporate insurers." }
    ],
    seoContent: "Business insurance is the shield that ensures commercial longevity. Unpredictable events like warehouse fire, machinery failures, or customer injury claims can drain your cash flow. PolicyPerfect simplifies commercial insurance. We help shop owners, manufacturers, and corporate offices evaluate risk and compare policies online. Build a custom package cover and protect your business today."
  },
  workmen: {
    title: "Workmen Compensation Insurance",
    sub: "Comply with Laws & Protect Your Workers from On-Job Injuries",
    icon: Briefcase,
    color: "slate",
    bgImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy Workmen Compensation Insurance online. Comply with the Employee Compensation Act, cover worker injuries, disability, and employer liability.",
    desc: "Protect your workers and secure your business against legal liabilities. Covers medical expenses, disability payouts, and legal compliance under the Employee Compensation Act.",
    badges: [
      { label: "Legal Compliance", sub: "Employee Comp. Act", icon: CheckCircle2 },
      { label: "Disability Cover", sub: "Temporary & Permanent", icon: Shield },
      { label: "Medical Expenses", sub: "On-job injuries", icon: HeartPulse },
      { label: "Employer Liability", sub: "Legal defense paid", icon: Banknote }
    ],
    whatIs: "Workmen Compensation Insurance (Employee Compensation Insurance) is a policy that covers an employer's legal liability to pay compensation to employees (workmen) for bodily injury or death caused by accidents or occupational diseases arising out of and in the course of their employment.",
    whyImportant: "Under the Employee Compensation Act of 1923, employers are legally liable to pay substantial compensation if a worker is injured or passes away during work. A Workmen Compensation policy covers these legal liabilities, medical costs, and legal defense fees, ensuring the business complies with labor laws.",
    whoShouldBuy: "Manufacturing plants, construction firms, transport operators, warehouse managers, and businesses employing manual labor or technicians.",
    variants: [
      { name: "Standard Workmen Compensation Policy", desc: "The basic policy covering legal liability under the Employee Compensation Act of 1923.", example: "Best for factories and construction contractors." },
      { name: "Extended WC Policy", desc: "Includes coverage under Common Law and covers medical expenses beyond legal limits.", example: "Best for companies with high-risk operations." }
    ],
    features: [
      { title: "Occupational Diseases Cover", desc: "Covers illnesses contracted due to prolonged exposure to hazardous work environments (like silicosis)." },
      { title: "Medical Extensions", desc: "Add-on cover paying for actual hospitalization and surgical costs of the injured worker." },
      { title: "Sub-Contractor Cover", desc: "Extends protection to temporary or sub-contracted workers working on your project site." }
    ],
    covered: [
      "Accidental death of a worker while performing official duties",
      "Permanent Total Disability (PTD) (e.g. loss of both limbs)",
      "Permanent Partial Disability (PPD) (e.g. loss of a finger/eye)",
      "Temporary Total Disability (TTD) (requires bed rest/leaves)",
      "Medical and surgical costs for treating the injury (if opted)",
      "Diseases contracted due to nature of work (Occupational diseases)",
      "Legal defense costs incurred by the employer"
    ],
    notCovered: [
      "Injuries sustained outside working hours or outside the work premises",
      "Worker under the influence of alcohol or drugs during the accident",
      "Willful disobedience of safety rules (like refusing to wear helmets)",
      "Non-fatal injuries that disable the worker for less than 3 days",
      "Any liability arising out of an agreement not declared to insurer",
      "Employee age under the legal working limit (child labor)"
    ],
    claimTimeline: [
      { step: "1", title: "Incident", desc: "Worker gets injured on the factory floor or site." },
      { step: '2', title: "First Aid & Admit", desc: "Provide immediate medical treatment and admit to hospital." },
      { step: '3', title: "Inform Insurer", desc: "Notify the insurance company and file a labor commissioner report." },
      { step: '4', title: "Submit Docs", desc: "Submit medical certificates, wage sheets, and accident reports." },
      { step: '5', title: "Settlement", desc: "Compensation amount calculated as per law is paid to worker/nominee." }
    ],
    rejectionReasons: [
      { reason: "Safety Rule Violation", desc: "Accident happened because worker willfully ignored safety nets/harnesses." },
      { reason: "Drunk at Work", desc: "Injury sustained while the employee was intoxicated." },
      { reason: "Unregistered Worker", desc: "Claiming for an employee not declared in the wage rolls submitted." },
      { reason: "Deliberate Injury", desc: "Self-inflicted injury by the worker to claim compensation." }
    ],
    premiumFactors: [
      { factor: "Nature of Work / Risk Profile", desc: "Roof construction workers have higher risk and premium than retail clerks." },
      { factor: "Total Wages Declared", desc: "Premium is calculated as a percentage of total employee wages." },
      { factor: "Past Accident History", desc: "Companies with clean safety records enjoy lower premium rates." },
      { factor: "Number of Workers", desc: "Higher headcount increases exposure, adjusting premium." }
    ],
    terms: [
      { term: "Employee Compensation Act", desc: "The labor law governing employer liability for worker injuries." },
      { term: "Wages", desc: "Includes basic salary, dearness allowance, and overtime paid to employees." },
      { term: "Occupational Disease", desc: "Chronic illness contracted due to nature of work (silicosis, lead poisoning)." },
      { term: "Temporary Disability", desc: "Injury preventing work for a temporary period." }
    ],
    documents: [
      "Completed and signed Claim Form",
      "First Information Report (FIR) or incident logbook entry",
      "Medical Certificate confirming nature and percentage of disability",
      "Hospital bills and discharge summary",
      "Wage sheet of the injured worker showing past 12 months salary",
      "Form A (Notification of Accident) submitted to Labor Commissioner"
    ],
    faqs: [
      { q: "What is Workmen Compensation Insurance?", a: "It is a policy covering an employer's legal liability to pay compensation to employees injured or deceased during work." },
      { q: "Is it mandatory in India?", a: "Yes, for manufacturing units, construction projects, transport, and businesses employing manual/hazardous labor under labor laws." },
      { q: "What does the Employee Compensation Act of 1923 mandate?", a: "It mandates employers to pay compensation for accidental death, permanent total/partial disability, and temporary disability caused during work." },
      { q: "Who pays the premium?", a: "The employer must pay the premium. It cannot be deducted from employee salaries." },
      { q: "Does it cover sub-contracted workers?", a: "Yes, you can extend the policy to cover casual and sub-contracted labor working on your project site." },
      { q: "What are occupational diseases?", a: "Diseases contracted due to long-term exposure to hazardous work conditions, such as lung disease in mining or lead poisoning in battery plants." },
      { q: "Are office employees covered?", a: "Yes, you can cover white-collar staff, but premiums are lower compared to factory/construction labor." },
      { q: "What happens if a worker is drunk during the accident?", a: "The claim is strictly excluded if the employee was under the influence of alcohol or drugs during the event." },
      { q: "How is the compensation amount calculated?", a: "It is calculated using formulas fixed by the Employee Compensation Act, based on the worker's age, monthly wages, and nature of disability." },
      { q: "Is there a limit on monthly wage for calculation?", a: "Yes, the government caps the monthly wage limit (currently ₹15,000) for calculating statutory compensation." },
      { q: "What is temporary total disability (TTD)?", a: "An injury that temporarily disables a worker from doing their job. Payout is made as half-monthly payments." },
      { q: "What is the penalty for not having WC policy?", a: "Employers face steep fines, interest penalties from the labor court, and must pay full compensation from personal funds." },
      { q: "Does it cover travel from home to work?", a: "No, commute from home to work is generally not covered unless the transport is provided by the employer." },
      { q: "Can I add medical expenses cover?", a: "Yes, you can add a medical extension rider to cover actual hospitalization costs." },
      { q: "Why compare Workmen Compensation plans on PolicyPerfect?", a: "We help you declare correct wage sheets, choose appropriate risk categories, and compare rates from top insurers." }
    ],
    seoContent: "Workmen Compensation Insurance is an absolute legal necessity for factories and construction sites. In the event of a worker accident, labor court settlements can be financially crippling. PolicyPerfect helps businesses buy legal and compliant workmen policies. Compare premiums calculated on wage sheets, customize medical extensions, and ensure labor compliance online."
  },
  pet: {
    title: "Pet Insurance",
    sub: "Give Your Furry Friends the Premium Healthcare They Deserve",
    icon: Heart,
    color: "rose",
    bgImg: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200",
    seoDesc: "Buy pet health insurance online. Secure coverage for dog and cat surgeries, accidental injuries, diagnostic tests, illnesses, and third-party liabilities.",
    desc: "Protect your dogs, cats, and pets with premium health coverage. Covers veterinary consultation fees, surgeries, hospitalization, illnesses, and third-party liabilities.",
    badges: [
      { label: "100% Surgery Cover", sub: "Of approved bills", icon: Stethoscope => HeartPulse },
      { label: "OPD & Illnesses", sub: "Vets & Treatments", icon: HeartPulse },
      { label: "Accident Protection", sub: "Instant Injury Cover", icon: Shield },
      { label: "Third-Party Liability", sub: "Damage caused by pet", icon: Banknote }
    ],
    whatIs: "Pet Insurance is a health insurance policy designed to cover veterinary medical expenses for domestic pets (primarily dogs and cats). It pays for diagnostics, surgeries, hospitalization, and medicines required to treat illnesses or accidental injuries. It also covers third-party liability if your pet bites someone or damages property.",
    whyImportant: "Modern veterinary treatments, blood tests, MRIs, and surgeries are highly advanced and expensive. A pet health policy ensures you can provide the best medical care for your furry companions without worrying about high clinic bills.",
    whoShouldBuy: "Pet owners, dog breeders, and cat lovers who want to manage their pet's healthcare expenses.",
    variants: [
      { name: "Accident Only Cover", desc: "Covers veterinary expenses incurred only due to accidental injuries.", example: "Best for active outdoor dogs." },
      { name: "Comprehensive Pet Health Policy", desc: "Covers accidents, illnesses, surgeries, hospitalization, and third-party liability.", example: "Highly recommended for complete pet protection." }
    ],
    features: [
      { title: "Surgery & Hospitalization", desc: "Covers veterinary fees, operation theater charges, and nursing during pet surgery." },
      { title: "Third-Party Liability", desc: "Legal protection if your pet bites a visitor or damages a neighbor's property." },
      { title: "Loss/Theft Cover", desc: "Financial payout if your pedigree pet is lost, stolen, or goes missing." }
    ],
    covered: [
      "Veterinary Hospitalization & Surgery",
      "Accidental Injury Treatment",
      "Critical Illnesses & Infections",
      "Diagnostic Tests (X-Rays, Blood Tests)",
      "Third-Party Liability (Pet damages someone else)",
      "OPD Consultation Fees (if opted)"
    ],
    notCovered: [
      "Pre-existing diseases or hereditary conditions",
      "Routine checkups, grooming, and cosmetic treatments",
      "Vaccinations and parasite control (unless add-on)",
      "Pregnancy, breeding, or whelping expenses",
      "Theft, loss, or intentional harm by owner",
      "Treatment for dental diseases (unless due to accident)"
    ],
    claimTimeline: [
      { step: "1", title: "Visit Vet", desc: "Take your pet to any registered veterinary clinic." },
      { step: '2', title: "Treatment", desc: "Carry out the required checkups or surgeries." },
      { step: '3', title: "Pay Bills", desc: "Settle the veterinary bills directly at the clinic." },
      { step: '4', title: "Submit Claim", desc: "Send bills, medical reports, and claim form to insurer." },
      { step: '5', title: "Reimbursement", desc: "Get reimbursed directly into your bank account." }
    ],
    rejectionReasons: [
      { reason: "Pre-existing Disease Link", desc: "Claiming for chronic illnesses present before buying the policy." },
      { reason: "No Microchip / Vaccination record", desc: "Failing to maintain updated vaccination records or missing pet microchip registration." },
      { reason: "Breeding Related Ailments", desc: "Claims for pregnancy complications or cesarean section expenses." },
      { reason: "Grooming costs", desc: "Filing claims for shampooing, claw clipping, or cosmetic surgeries." }
    ],
    premiumFactors: [
      { factor: "Pet Breed & Size", desc: "Pedigree breeds (like German Shepherds) have higher risks and premiums." },
      { factor: "Age of Pet", desc: "Older dogs/cats have higher illness rates and higher premiums." },
      { factor: "Sum Insured Chosen", desc: "Higher coverage limits increase the annual premium." },
      { factor: "Co-payment Selection", desc: "Opting for a co-pay (e.g. 10%) reduces the annual premium." }
    ],
    terms: [
      { term: "Co-payment", desc: "The share of the veterinary bill you pay (usually 10-20%)." },
      { term: "Pedigree", desc: "Purebred pets with registered lineage certificates." },
      { term: "OPD Cover", desc: "Out-Patient Department cover for simple clinic visits." },
      { term: "Third-Party Liability", desc: "Legal payout if your dog bites a guest." }
    ],
    documents: [
      "Completed Claim Form",
      "Original veterinary bills, receipts, and prescriptions",
      "Detailed medical summary or vet diagnosis report",
      "Diagnostic test results (X-Ray films, blood reports)",
      "Pet Health book / Vaccination card copy",
      "Pet photo showing microchip or identification mark"
    ],
    faqs: [
      { q: "What is Pet Insurance?", a: "It is health insurance for dogs and cats covering veterinary consultation, surgery, hospitalization, and third-party liability." },
      { q: "What is the entry age limit?", a: "Typically, pets can be insured from 8 weeks up to 8 or 10 years of age." },
      { q: "Does it cover vaccinations?", a: "Standard plans do not cover routine vaccinations. It is usually available as a wellness add-on rider." },
      { q: "Are pre-existing diseases covered?", a: "No, pre-existing diseases and hereditary conditions are excluded from pet insurance policies." },
      { q: "How do I file a pet insurance claim?", a: "Visit the vet, pay the bills, and submit the invoices along with clinical logs to the insurer for reimbursement." },
      { q: "What is Third-Party Liability for pets?", a: "It covers legal expenses and compensation if your dog attacks a third party or damages their property." },
      { q: "Does the policy cover grooming?", a: "No, cosmetic surgeries, grooming, shampooing, and claw trimming are strictly excluded." },
      { q: "Can I insure my cat?", a: "Yes, both cats and dogs are covered under pet health insurance." },
      { q: "What is the co-pay clause in pet plans?", a: "A percentage of the vet bill (usually 10% or 20%) that you must pay before the insurer settles the rest." },
      { q: "Are diagnostic tests like MRI covered?", a: "Yes, if they are recommended by a vet to diagnose a covered illness or accidental injury." },
      { q: "What happens if my pet goes missing?", a: "Some comprehensive policies reimburse the purchase cost of the pet and reward costs for finding them." },
      { q: "Is a microchip mandatory to buy policy?", a: "Most insurers require the pet to be microchipped or have a clear identification tag for processing claims." },
      { q: "Can I choose my own vet?", a: "Yes, you can visit any registered veterinary practitioner across India." },
      { q: "Are dental treatments covered?", a: "Dental cleaning or cosmetic dental work is excluded. Only dental surgeries caused by accidental injuries are covered." },
      { q: "Why compare pet insurance on PolicyPerfect?", a: "We help you compare premiums, waiting periods, breed exclusions, and co-payment terms from India's leading insurers." }
    ],
    seoContent: "Your pet is a member of your family, and their health is irreplaceable. Veterinary treatments can be a major expense, but pet insurance keeps your budget safe. PolicyPerfect helps you compare and buy dog and cat insurance plans online. Compare coverage for surgeries, accidents, illnesses, and legal liability. Protect your pet and enjoy absolute peace of mind."
  }
};
