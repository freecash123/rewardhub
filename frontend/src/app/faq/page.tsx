export default function FAQPage() {
  const faqs = [
    {q:'How do I earn crypto?',a:'Complete offers, surveys, and invite friends.'},
    {p:'Which cryptocurrencies are supported?',a:'Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Dogecoin (DOGE), and USDT (TRC20).'},
    {p:'How long do withdrawals take?',a:'Most withdrawals are processed within 24 hours.'},
    {p:'Are there any fees?',a:'RewardHub charges zero platform fees.'},
    {q:'What is the minimum withdrawal?',a:'The minimum withdrawal is $5 equivalent.'},
  ];
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-4">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">FAQ <span className="gradient-text">Questions</span></h1>
        {faqs.map((f,i)=>(
          <div key={i} className="card mb-4">
            <h3 className="font-semibold mb-2">{f.q}</h3>
            <p className="text-sm text-zinc-400">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}