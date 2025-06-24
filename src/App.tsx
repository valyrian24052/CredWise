import { useState, useEffect, type FC, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type ChangeEvent } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
};

const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
  className?: string;
};

const Checkbox: FC<CheckboxProps> = ({ checked, onCheckedChange, id, className }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onCheckedChange(e.target.checked)}
    className={`form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 ${className}`}
  />
);

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`border border-gray-700 bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
    {...props}
  />
);

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label: FC<LabelProps> = ({ children, ...props }) => (
  <label className="text-gray-300 font-medium" {...props}>
    {children}
  </label>
);

type CardProps = { children: ReactNode; className?: string };
const Card: FC<CardProps> = ({ children, className, ...props }) => (
  <div className={`rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

// Define a reusable type for card sections
type CardSectionProps = {
  children: ReactNode;
  className?: string;
};

const CardHeader: FC<CardSectionProps> = ({ children, className }) => <div className={`p-4 ${className || ''}`}>{children}</div>;
const CardTitle: FC<{ children: ReactNode, className?: string }> = ({ children, className }) => <h3 className={`text-lg font-bold ${className}`}>{children}</h3>;
const CardContent: FC<CardSectionProps> = ({ children, className }) => <div className={`p-4 pt-0 ${className || ''}`}>{children}</div>;
const CardFooter: FC<CardSectionProps> = ({ children, className }) => <div className={`p-4 pt-0 ${className || ''}`}>{children}</div>;


type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
  onClick?: () => void;
};

const Badge: FC<BadgeProps> = ({ children, className, variant, ...props }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variant === 'outline' ? 'border border-gray-600 text-gray-200 bg-gray-800' : 'bg-blue-600 text-white'} ${className}`}
    {...props}
  >
    {children}
  </span>
);

type CollapsibleProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Collapsible: FC<CollapsibleProps> = ({ children }) => <div>{children}</div>;

const CollapsibleTrigger: FC<{ children: ReactNode; asChild?: boolean, onClick: () => void; }> = ({ children, onClick, ...props }) => <div onClick={onClick} {...props}>{children}</div>;

const CollapsibleContent: FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>;

const Separator: FC<{ className?: string }> = ({ className }) => <hr className={`border-gray-700 ${className}`} />;

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  step: number;
  className?: string;
};

const Slider: FC<SliderProps> = ({ value, onValueChange, max, step }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange([value[0], parseInt(event.target.value, 10)]);
  };

  const handleLeftChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseInt(event.target.value, 10), value[1]]);
  }

  return (
    <div className="relative w-full h-2">
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value[0]}
        onChange={handleLeftChange}
        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
        style={{ zIndex: value[0] > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value[1]}
        onChange={handleChange}
        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
        style={{ zIndex: 4 }}
      />
    </div>
  );
};

// --- Main App Component ---

interface CreditCard {
  id: number;
  bank: string;
  name: string;
  category: string[];
  annualFee: number;
  incomeRequirement: number;
  benefits: string[];
  imagePrompt: string;
  selected: boolean;
}

const App: FC = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [feeRange, setFeeRange] = useState([0, 20000]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIncomeRange, setSelectedIncomeRange] = useState<string>("All");

  const banks = [
    "HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank", "Kotak Mahindra",
    "Yes Bank", "American Express", "IDFC FIRST Bank", "Amazon Pay"
  ];
  const categories = [
    "Travel", "Cashback", "Rewards", "Shopping", "No Annual Fee", "Fuel",
    "Luxury", "Dining", "Business", "Student", "UPI",
  ];
  const incomeRanges = [
    "All", "Under ₹3,00,000", "₹3,00,000 - ₹6,00,000",
    "₹6,00,000 - ₹12,00,000", "Over ₹12,00,000",
  ];

  useEffect(() => {
    const fontAwesomeScript = document.getElementById('font-awesome-script');
    if (!fontAwesomeScript) {
        const script = document.createElement("script");
        script.id = 'font-awesome-script';
        script.src = "https://kit.fontawesome.com/a076d05399.js";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }

    const mockCards: CreditCard[] = [
        {
            id: 1, bank: "HDFC Bank", name: "Regalia First", category: ["Travel", "Rewards"],
            annualFee: 1000, incomeRequirement: 400000,
            benefits: ["Priority Pass for lounge access", "5x reward points on dining", "Fuel surcharge waiver"],
            imagePrompt: "Premium blue credit card with metallic finish", selected: false,
        },
        {
            id: 2, bank: "ICICI Bank", name: "Sapphiro", category: ["Rewards", "Dining", "Travel"],
            annualFee: 3500, incomeRequirement: 800000,
            benefits: ["4x reward points on dining", "BOGO on movie tickets", "Complimentary golf sessions"],
            imagePrompt: "Elegant gold metal credit card", selected: false,
        },
        {
            id: 3, bank: "SBI Card", name: "SimplySAVE", category: ["Cashback", "Rewards"],
            annualFee: 499, incomeRequirement: 300000,
            benefits: ["10x rewards on dining & movies", "1% cashback on all other spends", "Welcome gift vouchers"],
            imagePrompt: "Modern white credit card with blue accents", selected: false,
        },
        {
            id: 4, bank: "Amazon Pay", name: "ICICI Bank Card", category: ["Cashback", "Shopping", "No Annual Fee"],
            annualFee: 0, incomeRequirement: 250000,
            benefits: ["5% cashback on Amazon for Prime members", "2% on partner merchants", "No joining or annual fees"],
            imagePrompt: "Amazon branded credit card with a smile logo", selected: false,
        },
        {
            id: 5, bank: "Axis Bank", name: "Flipkart Card", category: ["Cashback", "Shopping"],
            annualFee: 500, incomeRequirement: 300000,
            benefits: ["5% cashback on Flipkart", "4% cashback on Swiggy, PVR, Uber", "Airport lounge access"],
            imagePrompt: "Flipkart branded blue and yellow credit card", selected: false,
        },
        {
            id: 6, bank: "SBI Card", name: "Cashback Card", category: ["Cashback"],
            annualFee: 999, incomeRequirement: 350000,
            benefits: ["5% cashback on all online spends", "1% cashback on offline spends", "No merchant restrictions for online cashback"],
            imagePrompt: "A vibrant green and blue gradient credit card", selected: false,
        },
        {
            id: 7, bank: "HDFC Bank", name: "Millennia", category: ["Cashback", "Shopping"],
            annualFee: 1000, incomeRequirement: 350000,
            benefits: ["5% cashback on Amazon, Flipkart, etc.", "1% cashback on all other spends", "8 domestic lounge visits per year"],
            imagePrompt: "A stylish millennial-focused credit card with pastel colors", selected: false,
        },
        {
            id: 8, bank: "Axis Bank", name: "ACE Card", category: ["Cashback", "UPI"],
            annualFee: 499, incomeRequirement: 300000,
            benefits: ["5% on bill pays, DTH via Google Pay", "4% on Swiggy, Zomato, Ola", "2% flat cashback on all other spends"],
            imagePrompt: "A minimal and clean white credit card", selected: false,
        },
        {
            id: 9, bank: "American Express", name: "Platinum Travel", category: ["Travel", "Rewards", "Luxury"],
            annualFee: 3500, incomeRequirement: 600000,
            benefits: ["Milestone rewards up to 40,000 points", "Complimentary domestic lounge visits", "Taj & Marriott vouchers on reaching milestones"],
            imagePrompt: "The iconic American Express platinum card design", selected: false,
        },
        {
            id: 10, bank: "HDFC Bank", name: "Infinia", category: ["Luxury", "Travel", "Rewards"],
            annualFee: 12500, incomeRequirement: 3000000,
            benefits: ["Unlimited airport lounge access worldwide", "Complimentary golf games", "Low 2% forex markup fee"],
            imagePrompt: "An exclusive, metallic black credit card", selected: false,
        },
    ];
    setCards(mockCards);
    setFilteredCards(mockCards);
  }, []);

  useEffect(() => {
    let results = [...cards];
    if (searchQuery) {
      results = results.filter(
        (card) =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.bank.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedBanks.length > 0) {
      results = results.filter((card) => selectedBanks.includes(card.bank));
    }
    if (selectedCategories.length > 0) {
      results = results.filter((card) =>
        card.category.some((cat) => selectedCategories.includes(cat))
      );
    }
    results = results.filter(
      (card) => card.annualFee >= feeRange[0] && card.annualFee <= feeRange[1]
    );
    if (selectedIncomeRange !== "All") {
      if (selectedIncomeRange === "Under ₹3,00,000") {
        results = results.filter((card) => card.incomeRequirement < 300000);
      } else if (selectedIncomeRange === "₹3,00,000 - ₹6,00,000") {
        results = results.filter((c) => c.incomeRequirement >= 300000 && c.incomeRequirement < 600000);
      } else if (selectedIncomeRange === "₹6,00,000 - ₹12,00,000") {
        results = results.filter((c) => c.incomeRequirement >= 600000 && c.incomeRequirement < 1200000);
      } else if (selectedIncomeRange === "Over ₹12,00,000") {
        results = results.filter((card) => card.incomeRequirement >= 1200000);
      }
    }
    setFilteredCards(results);
  }, [searchQuery, selectedBanks, selectedCategories, feeRange, selectedIncomeRange, cards]);

  const toggleCardSelection = (id: number) => {
    setCards(currentCards => {
        const newCards = [...currentCards];
        const cardIndex = newCards.findIndex(c => c.id === id);
        if (cardIndex === -1) return newCards;

        const isCurrentlySelected = newCards[cardIndex].selected;
        let selectedCount = newCards.filter(c => c.selected).length;

        if (selectedCount >= 3 && !isCurrentlySelected) {
            const firstSelectedIndex = newCards.findIndex(c => c.selected);
            if (firstSelectedIndex !== -1) {
                newCards[firstSelectedIndex].selected = false;
            }
        }
        
        newCards[cardIndex].selected = !isCurrentlySelected;
        return newCards;
    });
  };
  
  useEffect(() => {
    setSelectedCards(cards.filter(card => card.selected));
  }, [cards]);


  const clearFilters = () => {
    setSearchQuery(""); setFeeRange([0, 20000]);
    setSelectedBanks([]); setSelectedCategories([]);
    setSelectedIncomeRange("All");
  };

  const toggleBank = (bank: string) => {
    setSelectedBanks((prev) => prev.includes(bank) ? prev.filter((b) => b !== bank) : [...prev, bank]);
  };
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
  };
  const handleIncomeChange = (range: string) => {
    setSelectedIncomeRange(currentRange => currentRange === range ? "All" : range);
  }
  
  const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>CreditWise Logo</title>
        <rect x="1" y="14" width="9" height="9" rx="2" fill="#F3EADA" transform="rotate(-15 5.5 18.5)" />
        <rect x="9" y="23" width="9" height="9" rx="2" fill="#F3EADA" />
        <rect x="19" y="23" width="9" height="9" rx="2" fill="#F3EADA" />
        <rect x="9" y="13" width="9" height="9" rx="2" fill="#F3EADA" />
        <rect x="19" y="13" width="9" height="9" rx="2" fill="#F3EADA" />
        <rect x="19" y="3" width="9" height="9" rx="2" fill="#F3EADA" />
        <path d="M23.5 0L20.5 3L26.5 3Z" fill="#4FB3A4" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-black text-white py-4 px-6 shadow-md border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3"> <Logo /> <h1 className="text-2xl font-bold text-white">CreditWise</h1> </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="font-medium hover:text-blue-400">Home</a>
            <a href="#" className="font-medium hover:text-blue-400">Cards</a>
            <a href="#" className="font-medium hover:text-blue-400">Compare</a>
            <a href="#" className="font-medium hover:text-blue-400">About</a>
          </nav>
          <div className="flex items-center"> <button className="text-white"> <i className="fas fa-user-circle text-2xl"></i> </button> </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5">
            <div className="bg-black border border-gray-800 rounded-lg p-4 sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <Button onClick={clearFilters} className="text-sm bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white whitespace-nowrap"> Clear All </Button>
              </div>
              
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <div className="flex justify-between items-center mb-4 cursor-pointer">
                    <h3 className="font-semibold text-white">Banks</h3>
                    <i className={`fas fa-chevron-${isFilterOpen ? "up" : "down"} text-sm text-gray-400`}></i>
                  </div>
                </CollapsibleTrigger>
                {isFilterOpen && (
                <CollapsibleContent>
                  <div className="space-y-2 mb-6">
                    {banks.map((bank) => (
                      <div key={bank} className="flex items-center">
                        <Checkbox id={`bank-${bank}`} checked={selectedBanks.includes(bank)} onCheckedChange={() => toggleBank(bank)} />
                        <Label htmlFor={`bank-${bank}`} className="ml-2 cursor-pointer text-gray-300"> {bank} </Label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
                )}
              </Collapsible>
              <Separator className="my-4" />
              <div className="mb-6">
                 <h3 className="font-semibold text-white mb-4">Card Categories</h3>
                 <div className="space-y-2">
                   {categories.map((category) => (
                     <div key={category} className="flex items-center">
                       <Checkbox id={`category-${category}`} checked={selectedCategories.includes(category)} onCheckedChange={() => toggleCategory(category)} />
                       <Label htmlFor={`category-${category}`} className="ml-2 cursor-pointer text-gray-300"> {category} </Label>
                     </div>
                   ))}
                 </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-6">
                <h3 className="font-semibold text-white mb-4">Annual Fee Range</h3>
                 <div className="px-2">
                    <Slider max={20000} step={500} value={feeRange} onValueChange={setFeeRange} className="my-6" />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>₹{feeRange[0]}</span>
                        <span>₹{feeRange[1]}</span>
                    </div>
                 </div>
              </div>
              <Separator className="my-4" />
              <div>
                <h3 className="font-semibold text-white mb-4">Income Requirements</h3>
                <div className="space-y-2">
                  {incomeRanges.map((range) => (
                    <div key={range} className="flex items-center">
                       <Checkbox id={`income-${range}`} checked={selectedIncomeRange === range} onCheckedChange={() => handleIncomeChange(range)} />
                      <Label htmlFor={`income-${range}`} className="ml-2 cursor-pointer text-gray-300">{range}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <div className="md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white"> Available Cards ({filteredCards.length}) </h2>
              <div className="text-sm text-gray-400">
                {selectedCards.length > 0 && ( <span> {selectedCards.length} card{selectedCards.length > 1 ? "s" : ""} selected </span> )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <Card key={card.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 bg-gray-900 border border-gray-700 flex flex-col">
                  <div className={`relative h-40 overflow-hidden flex items-center justify-center border-b border-gray-800`}>
                    <div className="absolute inset-0 opacity-10">
                       <img src={`https://placehold.co/400x300/1a1a1a/FFFFFF?text=${encodeURIComponent(card.imagePrompt)}`} alt={card.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 flex items-center space-x-3 text-center">
                      <span className="text-2xl font-bold text-white px-2"> {card.bank} </span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-20">
                    <Checkbox id={`select-${card.id}`} checked={card.selected} onCheckedChange={() => toggleCardSelection(card.id)} className="h-5 w-5 bg-white border-gray-300 rounded-sm"/>
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{card.name}</CardTitle>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {card.category.map((cat) => ( <Badge key={cat} variant="outline" className="text-xs"> {cat} </Badge> ))}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-2 mb-4">
                          {card.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start">
                              <i className="fas fa-check-circle text-green-400 mt-1 mr-2 text-xs"></i>
                              <p className="text-sm text-gray-300">{benefit}</p>
                            </div>
                          ))}
                        </div>
                         <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                            <div>
                                <span className="text-xs text-gray-400">Annual Fee</span>
                                <p className="font-semibold text-white">
                                    {card.annualFee === 0 ? "Zero Fee" : `₹${card.annualFee.toLocaleString("en-IN")}`}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Min. Income (p.a.)</span>
                                <p className="font-semibold text-white">
                                    ₹{(card.incomeRequirement / 100000).toFixed(1)}L
                                </p>
                            </div>
                         </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full border-gray-600 text-white hover:bg-blue-600 hover:border-blue-600">
                          <i className="fas fa-info-circle mr-2"></i>
                          Learn More
                        </Button>
                      </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
            {filteredCards.length === 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
                <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2 text-gray-200"> No cards found </h3>
                <p className="text-gray-500 mb-6"> Try adjusting your filters or search criteria. </p>
                <Button onClick={clearFilters}> Clear All Filters </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedCards.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button size="lg" className="px-6 py-4 shadow-lg !rounded-full">
            Compare {selectedCards.length} Card{selectedCards.length > 1 ? "s" : ""}{" "}
            <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      )}

      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <Logo />
                 <h3 className="text-xl font-bold">CreditWise</h3>
              </div>
              <p className="text-gray-400 mb-6"> Your one-stop destination for comparing credit cards and making wise financial decisions. </p>
              <div className="flex space-x-4">
                 <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                 <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                 <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                 <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
             <div>
                 <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                 <ul className="space-y-2">
                     <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white">Cards</a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white">Compare</a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                 </ul>
             </div>
             <div>
                 <h4 className="font-semibold mb-4 text-white">Card Categories</h4>
                 <ul className="space-y-2">
                     {categories.slice(0, 5).map(cat => (
                        <li key={cat}><a href="#" className="text-gray-400 hover:text-white">{cat}</a></li>
                     ))}
                 </ul>
             </div>
             <div>
                <h4 className="font-semibold mb-4 text-white">Newsletter</h4>
                <p className="text-gray-400 mb-4">Subscribe for the latest offers.</p>
                <div className="flex">
                    <Input type="email" placeholder="your.email@example.com" className="bg-gray-800 border-gray-700 rounded-r-none"/>
                    <Button className="rounded-l-none">Subscribe</Button>
                </div>
             </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-gray-500 text-sm">
             <p>© 2025 CreditWise. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
