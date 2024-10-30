import React from 'react'

const About = () => {
  const choosThis = [
    {
      title: 'Exclusive High-End Auctions',
      discription:
        'We bring you exclusive access to some of the world’s most sought-after items. From rare vintage cars and exquisite jewelry to high-demand real estate, our platform ensures that you always have the opportunity to invest in the extraordinary.',
    },
    {
      title: 'Unmatched Efficiency',
      discription:
        'With our cutting-edge technology and user-friendly interface, bidding and selling have never been easier. Our platform is optimized to deliver a seamless experience, minimizing delays and maximizing convenience for both buyers and sellers.',
    },
    {
      title: 'Global Reach',
      discription:
        "We connect buyers and sellers from across the globe, giving you the opportunity to access items and buyers you wouldn't find elsewhere. Our platform breaks geographical boundaries, bringing international assets to your fingertips.",
    },
    {
      title: 'Secure Transactions',
      discription:
        'Trust is at the heart of every transaction. With robust security protocols and secure payment gateways, we ensure that your auction experience is protected, efficient, and stress-free.',
    },
    {
      title: 'Expert Support Team',
      discription:
        'Our experienced support team is available to guide you through every step of the auction process. Whether you’re a bidder looking to secure your next investment or a seller listing a high-value item, we provide dedicated assistance to ensure success.',
    },
  ]

  const whyBestChoice = [
    {
      title: 'Curated Auctions, Exclusive Listings',
      description:
        "We specialize in hosting auctions for the most coveted and valuable assets. Our team of experts works tirelessly to bring unique items to auction, ranging from rare antiques and precious gems to high-end real estate and luxury automobiles. Whether you're in search of investment opportunities or a one-of-a-kind collectible, you’ll find something truly special on our platform.",
    },
    {
      title: 'Efficiency at its Best',
      description:
        'Time is money. Our auction system is designed for speed, precision, and ease-of-use. From streamlined bidding processes to quick, secure payments, we ensure that every interaction on our platform is swift and hassle-free. Sellers benefit from fast turnarounds and exposure to serious, qualified buyers, while buyers enjoy a smooth, intuitive bidding experience with real-time updates.',
    },
    {
      title: 'More Value, Less Hassle',
      description:
        'The more valuable an asset, the more important it is to handle transactions efficiently. At [Your Auction Platform Name], we’ve taken out the unnecessary steps and complicated processes to offer you an experience where you get more value with less effort. Our smart features, automated tools, and professional support make it easier than ever to buy or sell high-end assets at your convenience.',
    },
    {
      title: 'Global Reach, Local Expertise',
      description:
        'We don’t just connect buyers and sellers — we unite a global community of passionate collectors and investors. With users from across the world, [Your Auction Platform Name] ensures that your high-value assets receive maximum exposure. At the same time, our team of local experts offers in-depth knowledge about niche markets, providing guidance to help you make informed decisions.',
    },
    {
      title: 'Unbeatable Transparency & Trust',
      description:
        "Transparency is at the core of everything we do. Every listing, every bid, and every transaction on our platform is backed by robust verification processes. With full visibility into asset details and transaction histories, you can trust that you're getting exactly what you're bidding for. Our secure payment gateways and reliable escrow services give you peace of mind throughout the auction process.",
    },
    {
      title: 'Dedicated, Professional Support',
      description:
        "Our mission is to provide the highest level of service. That’s why we offer dedicated support to both buyers and sellers at every stage of the auction process. Whether you're new to auctions or an experienced bidder, our team is here to provide personalized assistance and ensure that your experience is nothing short of exceptional.",
    },
  ]

  return (
    <div>
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 px-4 justify-center">
        <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          About Us
        </h1>
        <div className="text-xl text-slate-600">
          Welcome to Varun Auctions, the ultimate destination for discovering,
          bidding, and securing valuable assets through the most seamless and
          transparent online auction experience. At Varun Auctions, we
          specialize in offering a diverse range of high-value items, from rare
          collectibles and luxury goods to real estate and fine art, ensuring
          that our platform caters to both seasoned investors and first-time
          bidders alike. Our team is dedicated to curating exclusive auctions
          with unparalleled efficiency, trust, and expertise, enabling buyers
          and sellers to engage in a marketplace driven by integrity and
          excellence.
          <h1 className="mt-10 mb-4 text-3xl sm:text-2xl font-bold underline">
            Why Choose Us?
          </h1>
          {choosThis.map((v, i) => {
            return (
              <div key={i}>
                <li className="text-black text-2xl font-bold">{v.title}</li>
                <p>{v.discription}</p>
              </div>
            )
          })}
          <h3 className="text-2xl font-bold text-slate-600 my-3">
            Join Us in Redefining Auctions
          </h3>
          <p className="mb-3">
            At Varun Auctions, we’re not just conducting auctions — we’re
            revolutionizing the way high-value assets are traded. With an
            unwavering commitment to excellence, efficiency, and transparency,
            we invite you to be a part of our exclusive community of bidders and
            sellers.
          </p>
          <p>
            Explore our auctions today and take the next step in acquiring rare,
            valuable, and unique assets through a platform that prioritizes your
            success.
          </p>
          <h2 className="text-2xl font-bold mt-10 mb-4">
            Why We're the Best Choice{' '}
          </h2>
          {whyBestChoice.map((v, i) => {
            return (
              <div key={i}>
                <li className="font-semibold text-red-950 my-3">{v.title}</li>
                <p>{v.description}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default About
