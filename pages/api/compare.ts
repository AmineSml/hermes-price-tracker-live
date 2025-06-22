export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query } = req.body;

  const mockResults = [
    {
      country: "France",
      local_price: "€8,500",
      usd_price: 9150,
      link: "https://www.hermes.com/fr/en/product/mock-item/"
    },
    {
      country: "Japan",
      local_price: "¥1,420,000",
      usd_price: 9200,
      link: "https://www.hermes.com/jp/en/product/mock-item/"
    },
    {
      country: "United States",
      local_price: "$9,700",
      usd_price: 9700,
      link: "https://www.hermes.com/us/en/product/mock-item/"
    },
    {
      country: "UK",
      local_price: "£7,900",
      usd_price: 9950,
      link: "https://www.hermes.com/uk/en/product/mock-item/"
    },
    {
      country: "UAE",
      local_price: "AED 37,000",
      usd_price: 10075,
      link: "https://www.hermes.com/ae/en/product/mock-item/"
    }
  ];

  res.status(200).json({ results: mockResults });
}
