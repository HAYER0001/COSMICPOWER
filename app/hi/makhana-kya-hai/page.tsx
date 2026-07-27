import type { Metadata } from 'next'
import Link from 'next/link'
import LangSetter from '@/components/seo/LangSetter'
import { Container, Tag } from '@/components/shared/primitives'

const BASE_URL = 'https://www.cosmicpower.ltd'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'मखाना क्या है? — फ़ायदे, सूत ग्रेड, सही मखाना कैसे चुनें, रोज़ कितना खाएं',
    description:
      'मखाना (fox nuts / phool makhana) क्या है? इसके फ़ायदे, सूत ग्रेड क्या होते हैं, रोस्टेड vs फ्राइड मखाना में अंतर, स्टोर कैसे करें, और सही मखाना खरीदने की चेकलिस्ट — हिंदी में पूरी जानकारी।',
    openGraph: {
      title: 'मखाना क्या है? — फ़ायदे, सूत ग्रेड, सही मखाना चुनने का तरीक़ा',
      description:
        'मखाना (Euryale ferox) के बारे में पूरी जानकारी हिंदी में: यह क्या है, कैसे उगाया जाता है, सूत ग्रेड, पोषण, फ़ायदे, और रोज़ कितना खाएं।',
      url: `${BASE_URL}/hi/makhana-kya-hai`,
      images: [{ url: `${BASE_URL}/images/og/og-default.jpg`, width: 1200, height: 630, alt: 'मखाना गाइड — गोल्डन डियर' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'मखाना क्या है? — फ़ायदे, सूत ग्रेड, सही मखाना कैसे चुनें',
      description:
        'मखाना (Euryale ferox) के बारे में पूरी जानकारी हिंदी में: यह क्या है, कैसे उगाया जाता है, सूत ग्रेड, पोषण, फ़ायदे, और रोज़ कितना खाएं।',
      images: [`${BASE_URL}/images/og/og-default.jpg`],
    },
    alternates: { canonical: `${BASE_URL}/hi/makhana-kya-hai` },
    keywords: ['मखाना क्या है', 'fox nuts in hindi', 'phool makhana', 'makhana ke fayde', 'makhana kya hota hai', 'मखाना के फायदे', 'suta grade makhana', 'makhana nutrition hindi', 'मखाना कैसे खाएं'],
    other: {
      'google': 'notranslate',
    },
  }
}

const faqMini = [
  {
    q: 'क्या मखाना रोज़ खा सकते हैं?',
    a: 'हाँ, बिल्कुल। एक स्वस्थ वयस्क के लिए रोज़ 30-50 ग्राम (करीब 2-3 मुट्ठी) मखाना खाना सुरक्षित और फ़ायदेमंद है। यह प्रोटीन और फ़ाइबर से भरपूर है और इसमें फ़ैट नगण्य है। बस संतुलित मात्रा में खाएं — किसी भी चीज़ की अति नुकसानदेह हो सकती है।',
  },
  {
    q: 'क्या मखाना डायबिटीज़ में खा सकते हैं?',
    a: 'हाँ, मखाना का ग्लाइसेमिक इंडेक्स कम (लगभग 50 से नीचे) होता है, जिससे यह ब्लड शुगर को धीरे-धीरे बढ़ाता है। इसमें मौजूद फ़ाइबर और प्रोटीन भूख को नियंत्रित रखते हैं। फिर भी, 30 ग्राम की मात्रा में ही खाएं और अपने डॉक्टर से सलाह ज़रूर लें।',
  },
  {
    q: 'मखाना खाने का सबसे अच्छा समय क्या है?',
    a: 'मखाना किसी भी समय खाया जा सकता है — सुबह नाश्ते में, दोपहर में स्नैक के तौर पर, या रात को हल्की भूख लगने पर। यह व्रत में भी खाया जाता है। वर्कआउट के बाद प्रोटीन के लिए भी यह एक अच्छा विकल्प है।',
  },
  {
    q: 'क्या बच्चे मखाना खा सकते हैं?',
    a: 'हाँ, मखाना बच्चों के लिए बहुत अच्छा स्नैक है। यह नेचुरली सॉफ्ट-क्रंची होता है, इसमें कैल्शियम और प्रोटीन होता है। छोटे बच्चों (2 साल से कम) के लिए मखाना को छोटे टुकड़ों में तोड़ कर दें। कोई आर्टिफ़िशियल कलर या प्रिज़र्वेटिव नहीं — बिल्कुल सुरक्षित।',
  },
  {
    q: 'मखाना और कमल के बीज में क्या अंतर है?',
    a: 'मखाना (Euryale ferox) और कमल के बीज (lotus seeds / makhane) दो अलग पौधों के बीज हैं। मखाना जलीय तालाबों में उगने वाले कँटीले पौधे से आता है, जबकि कमल के बीज कमल के फूल से। दोनों भारतीय खाने में उपयोग होते हैं लेकिन बोटैनिकल रूप से भिन्न हैं। पूरी जानकारी के लिए हमारा <Link href=\"/makhana/glossary/lotus-seeds-vs-makhana\" className=\"text-gold underline underline-offset-2\">lotus seeds vs makhana ग्लॉसरी पेज</Link> देखें।',
  },
]

export default function MakhanaKyaHai() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'मखाना क्या है? — फ़ायदे, सूत ग्रेड, सही मखाना चुनने का तरीक़ा, और रोज़ कितना खाएं',
        description: 'मखाना (fox nuts / phool makhana) के बारे में पूरी जानकारी हिंदी में: यह क्या है, कैसे उगाया जाता है, सूत ग्रेड सिस्टम, पोषण, स्वास्थ्य लाभ, रोस्टेड vs फ्राइड मखाना में अंतर, और सही मखाना खरीदने की चेकलिस्ट।',
        datePublished: '2026-07-16',
        dateModified: '2026-07-16',
        author: { '@type': 'Organization', name: 'Golden Deer | गोल्डन डियर', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Golden Deer | गोल्डन डियर', url: BASE_URL },
        image: `${BASE_URL}/images/og/og-default.jpg`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/hi/makhana-kya-hai`, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] } },
        inLanguage: 'hi',
        hasPart: [
          { '@type': 'WebPageElement', name: 'मखाना क्या है — त्वरित उत्तर' },
          { '@type': 'WebPageElement', name: 'मखाना क्या है — विस्तृत जानकारी' },
          { '@type': 'WebPageElement', name: 'मखाना कैसे उगाया जाता है' },
          { '@type': 'WebPageElement', name: 'सूत ग्रेड — क्या होते हैं' },
          { '@type': 'WebPageElement', name: 'मखाना के फायदे' },
          { '@type': 'WebPageElement', name: 'रोस्टेड vs फ्राइड मखाना' },
          { '@type': 'WebPageElement', name: 'मखाना को कैसे स्टोर करें' },
          { '@type': 'WebPageElement', name: 'सही मखाना कैसे खरीदें — चेकलिस्ट' },
          { '@type': 'WebPageElement', name: 'अक्सर पूछे जाने वाले सवाल' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'मखाना क्या है', item: `${BASE_URL}/hi/makhana-kya-hai` },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/hi/makhana-kya-hai`,
        name: 'मखाना क्या है? — पूरी जानकारी हिंदी में',
        inLanguage: 'hi',
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-summary'] },
      },
    ],
  }

  return (
    <>
      <LangSetter lang="hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-cream" lang="hi">
        <Container className="py-12 lg:py-20 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-forest-deep/50">
              <li><Link href="/" className="transition-colors hover:text-forest-deep/70">Home</Link></li>
              <li aria-hidden="true" className="text-forest-deep/20">/</li>
              <li className="text-forest-deep/70" aria-current="page">मखाना क्या है</li>
            </ol>
          </nav>

          <Tag variant="forest" className="mb-4">हिंदी गाइड</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-forest-deep">
            मखाना क्या है?
            <br />
            <span className="text-gold text-2xl sm:text-3xl lg:text-4xl">फ़ायदे, सूत ग्रेड, सही मखाना चुनने का तरीक़ा, और रोज़ कितना खाएं</span>
          </h1>
          <p className="mt-3 text-xs text-forest-deep/40 font-mono">हिंदी में पूरी जानकारी · अंतिम अपडेट जुलाई 2026</p>

          <p className="mt-2 text-xs text-forest-deep/30">
            <Link href="/makhana" className="underline underline-offset-2 hover:text-gold transition-colors">Read this guide in English &rarr;</Link>
          </p>

          <div className="mt-8 p-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent speakable-summary">
            <p className="text-sm sm:text-base text-forest-deep leading-relaxed">
              <strong>मखाना</strong> — जिसे <strong>fox nuts</strong> या <strong>phool makhana</strong> भी कहते हैं — <em>Euryale ferox</em> नामक जलीय पौधे के बीज हैं जो बिहार के गंगा के मैदानी इलाकों के तालाबों में उगाए जाते हैं। यह नेचुरली ग्लूटेन-फ़्री है, प्रोटीन से भरपूर (9.7 ग्राम प्रति 100 ग्राम), फ़ैट बहुत कम (0.1 ग्राम), और भारत में व्रत-उपवास का पारंपरिक भोजन है। इस गाइड में जानें: मखाना क्या है, कैसे उगाया जाता है, सूत ग्रेड क्या होते हैं, पोषण, फ़ायदे, रोस्टेड vs फ्राइड में अंतर, स्टोर करने का तरीक़ा, और सही मखाना खरीदने की चेकलिस्ट।
              <Link href="/products" className="block mt-2 text-gold underline underline-offset-2 text-sm font-medium">गोल्डन डियर के मखाना प्रोडक्ट्स देखें &rarr;</Link>
            </p>
          </div>

          <nav className="my-10 p-5 rounded-xl border border-forest/10 bg-cream-dark/30" aria-label="विषय सूची">
            <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">इस पेज पर</h2>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                ['makhana-kya-hai-detail', 'मखाना क्या है'],
                ['kheti', 'मखाना कैसे उगाया जाता है'],
                ['suta-grade', 'सूत ग्रेड — क्या होते हैं'],
                ['fayde', 'मखाना के फ़ायदे'],
                ['roasted-vs-fried', 'रोस्टेड vs फ्राइड मखाना'],
                ['storage', 'मखाना को कैसे स्टोर करें'],
                ['buying-checklist', 'सही मखाना कैसे खरीदें'],
                ['faq', 'अक्सर पूछे जाने वाले सवाल'],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-forest-deep/70 hover:text-gold transition-colors underline underline-offset-2 decoration-forest/20">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Section 1: मखाना क्या है */}
          <Section id="makhana-kya-hai-detail" title="मखाना क्या है — विस्तृत जानकारी">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              मखाना एक जलीय फ़सल है जो खड़े पानी वाले तालाबों (4-6 फ़ीट गहरे) में उगाई जाती है। <em>Euryale ferox</em> — जिसे prickly water lily या गोरगन प्लांट भी कहते हैं — के पत्ते 1.5 मीटर तक चौड़े होते हैं और पानी की सतह पर तैरते हैं। इसके फलों के अंदर 15-30 काले, कड़े बीज होते हैं जो दिखने में काले चने जैसे लगते हैं। यही कच्चा मखाना है।
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              कच्चा मखाना खाने लायक़ नहीं होता। जो सफ़ेद, फूला हुआ मखाना आप बाज़ार में खरीदते हैं, वह कच्चे बीजों को भूनने और फुलाने (पॉपिंग) की प्रक्रिया से तैयार होता है — ठीक वैसे ही जैसे मक्का से पॉपकॉर्न बनता है। पूरी प्रक्रिया जानने के लिए हमारा <Link href="/makhana" className="text-gold underline underline-offset-2">इंग्लिश मखाना गाइड</Link> देखें।
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              मखाना को कमल के बीज (lotus seeds) से भ्रमित न करें — ये बोटैनिकल रूप से अलग हैं। दोनों भारतीय खाने और आयुर्वेद में उपयोग होते हैं, लेकिन मखाना (Euryale ferox) को ही उत्तर भारत में &ldquo;फूल मखाना&rdquo; कहा जाता है। अंतर समझने के लिए हमारा <Link href="/makhana/glossary/lotus-seeds-vs-makhana" className="text-gold underline underline-offset-2">lotus seeds vs makhana ग्लॉसरी पेज</Link> पढ़ें।
            </p>
          </Section>

          {/* Section 2: मखाना कैसे उगाया जाता है */}
          <Section id="kheti" title="मखाना कैसे उगाया और काटा जाता है">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              मखाना की खेती किसी और फ़सल की तरह नहीं होती। यह प्राकृतिक या मानव-निर्मित तालाबों में 4-6 फ़ीट गहरे पानी में उगाया जाता है। फ़रवरी-मार्च में बीज तालाब की कीचड़ में बोए जाते हैं और अप्रैल तक पानी की सतह पर बड़े-बड़े पत्ते दिखने लगते हैं।
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              मखाना की मुख्य पैदावार <strong>बिहार के मिथिला क्षेत्र</strong> में होती है — दरभंगा, मधुबनी, पूर्णिया, कटिहार, सहरसा, सुपौल, और किशनगंज जिले। इस क्षेत्र को <strong><Link href="/makhana/glossary/mithila-makhana-gi" className="text-gold underline underline-offset-2">Mithila Makhana GI टैग</Link></strong> प्राप्त है, जो मान्यता देता है कि यहाँ का मखाना अपनी भौगोलिक विशेषताओं — गंगा की मिट्टी का खनिज संयोजन, पानी की केमिस्ट्री, और सदियों पुरानी खेती की विधियों — के कारण अद्वितीय है।
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              कटाई पूरी तरह से <strong>हाथ से की जाती है</strong>। अगस्त-सितंबर में किसान छाती तक पानी में उतरते हैं, पानी के नीचे छिपे फलों को हाथ से ढूँढ़ते हैं, और टोकरियों में इकट्ठा करते हैं। हर फल को हाथ से खोलकर बीज निकाले जाते हैं। एक कुशल किसान रोज़ 10-15 किलो कच्चे बीज इकट्ठा कर सकता है। ताज़ा बीजों को धोकर 3-5 दिन धूप में सुखाया जाता है।
            </p>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              गोल्डन डियर इसी क्षेत्र की किसान सहकारी समितियों से सीधा मखाना खरीदता है। हर लॉट ट्रेसेबल है — किसान और कटाई की तारीख़ तक। हमारे <Link href="/brand" className="text-gold underline underline-offset-2">ब्रांड फ़ैक्ट शीट</Link> पर सोर्सिंग की पूरी जानकारी है।
            </p>
          </Section>

          {/* Section 3: सूत ग्रेड */}
          <Section id="suta-grade" title="सूत ग्रेड — क्या होते हैं और क्यों मायने रखते हैं">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              <strong>सूत</strong> मखाना के बीजों के व्यास (diameter) की पारंपरिक माप है। सीधी बात: जितना ज़्यादा सूत, उतना बड़ा बीज, उतना ही बड़ा और फूला हुआ पॉप्ड मखाना। यह ग्रेडिंग सिस्टम बिहार के मखाना व्यापार में सार्वभौमिक है।
            </p>
            <div className="overflow-x-auto mt-4 border border-forest/10 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-deep/5 border-b border-forest/10">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">ग्रेड</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">व्यास</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-forest-deep/60">किसके लिए बेस्ट</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  <tr className="hover:bg-cream-dark/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-forest-deep">5–6 सूत (जंबो)</td>
                    <td className="px-4 py-3 font-mono tabular-nums text-forest-deep/70">18–24 mm</td>
                    <td className="px-4 py-3 text-forest-deep/70">रिटेल, एक्सपोर्ट, व्हाइट-लेबल रोस्टिंग</td>
                  </tr>
                  <tr className="hover:bg-cream-dark/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-forest-deep">4–5 सूत (स्टैंडर्ड)</td>
                    <td className="px-4 py-3 font-mono tabular-nums text-forest-deep/70">14–18 mm</td>
                    <td className="px-4 py-3 text-forest-deep/70">HoReCa, प्रोसेस्ड स्नैक्स, खाना पकाने में</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              बड़े बीज बड़ा और एकसार पॉप्ड मखाना देते हैं। अगर पैक पर सूत ग्रेड नहीं लिखा है, तो सप्लायर से पूछें। गोल्डन डियर सभी रिटेल प्रोडक्ट्स के लिए <Link href="/makhana/glossary/5-6-suta-jumbo" className="text-gold underline underline-offset-2">5-6 सूत जंबो ग्रेड</Link> का उपयोग करता है। थोक खरीदारों के लिए <Link href="/makhana/glossary/4-5-suta" className="text-gold underline underline-offset-2">4-5 सूत</Link> भी उपलब्ध है। पूरी जानकारी <Link href="/makhana/glossary/suta" className="text-gold underline underline-offset-2">सूत ग्रेड ग्लॉसरी पेज</Link> पर।
            </p>
          </Section>

          {/* Section 4: मखाना के फ़ायदे */}
          <Section id="fayde" title="मखाना खाने के फ़ायदे">
            <div className="mt-4 space-y-4">
              <Benefit title="प्रोटीन से भरपूर — भूख नियंत्रित रखे">
                9.7 ग्राम प्रोटीन प्रति 100 ग्राम — मखाना में ज़्यादातर स्नैक ग्रेन्स से ज़्यादा प्रोटीन है। प्रोटीन भूख को देर तक शांत रखता है और मसल्स हेल्थ के लिए ज़रूरी है।
              </Benefit>
              <Benefit title="बहुत कम फ़ैट — गिल्ट-फ़्री क्रंच">
                0.1 ग्राम फ़ैट प्रति 100 ग्राम — मखाना दुनिया के सबसे कम फ़ैट वाले स्नैक्स में से एक है। यह ड्राई-रोस्टेड है, तला हुआ नहीं। फ्लेवर्ड वेरिएंट में भी मिनिमल ऑल कोटिंग से केवल 0.3-1.2 ग्राम फ़ैट आता है।
              </Benefit>
              <Benefit title="नेचुरली ग्लूटेन-फ़्री और वीगन">
                मखाना कोई अनाज नहीं, बीज है — इसलिए नेचुरली ग्लूटेन-फ़्री। गोल्डन डियर के सभी प्रोडक्ट्स एक समर्पित फ़ैसिलिटी में बनते हैं जहाँ ग्लूटेन क्रॉस-कॉन्टैमिनेशन नहीं है। क्लासिक रोस्ट, पिंक सॉल्ट & पेपर, पेरी पेरी, स्पाइसी मसाला, और रॉ मखाना — सभी वीगन-फ़्रेंडली हैं।
              </Benefit>
              <Benefit title="लो ग्लाइसेमिक इंडेक्स — डायबिटीज़-फ़्रेंडली">
                मखाना के कॉम्प्लेक्स कार्बोहाइड्रेट धीरे-धीरे पचते हैं, जिससे ब्लड शुगर अचानक नहीं बढ़ता। इसका GI लगभग 50 से नीचे माना जाता है। फ़ाइबर की मात्रा भी शुगर एब्ज़ॉर्प्शन को धीमा करती है।
              </Benefit>
              <Benefit title="एंटीऑक्सीडेंट से भरपूर">
                मखाना में फ्लेवोनॉइड्स (kaempferol डेरिवेटिव) और फ़ेनोलिक कंपाउंड्स होते हैं जो एंटीऑक्सीडेंट का काम करते हैं और शरीर में फ़्री रेडिकल्स को न्यूट्रलाइज़ करने में मदद करते हैं।
              </Benefit>
              <Benefit title="हड्डियों के लिए अच्छा">
                कैल्शियम (60 मिलीग्राम), मैग्नीशियम (67 मिलीग्राम), और फ़ॉस्फ़ोरस (150 मिलीग्राम) प्रति 100 ग्राम — ये तीनों मिनरल्स हड्डियों की डेंसिटी के लिए ज़रूरी हैं।
              </Benefit>
            </div>
            <p className="mt-4 text-xs text-forest-deep/50 italic">
              ये फ़ायदे प्रकाशित न्यूट्रीशनल रिसर्च और पारंपरिक ज्ञान पर आधारित हैं। गोल्डन डियर कोई मेडिकल क्लेम नहीं करता। व्यक्तिगत डाइट्री सलाह के लिए डॉक्टर से सलाह लें।
            </p>
          </Section>

          {/* Section 5: रोस्टेड vs फ्राइड */}
          <Section id="roasted-vs-fried" title="रोस्टेड vs फ्राइड मखाना — क्या अंतर है?">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              बाज़ार में दो तरह का मखाना मिलता है: <strong>रोस्टेड (भुना हुआ)</strong> और <strong>फ्राइड (तला हुआ)</strong>। फ़र्क समझना ज़रूरी है:
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#1A7A3A]/10 text-[#1A7A3A] text-xs font-bold font-mono mt-0.5">✓</span>
                <div>
                  <span className="text-sm font-semibold text-forest-deep">रोस्टेड (भुना हुआ): </span>
                  <span className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">ड्राई हीट से या न्यूनतम तेल में भून कर बनाया जाता है। फ़ैट बहुत कम (0.1 ग्राम/100 ग्राम), कुरकुरापन नेचुरल, पोषण सुरक्षित रहता है। गोल्डन डियर का मखाना इसी विधि से बनता है — टचलेस रोस्टिंग तकनीक से।</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gold/15 text-gold-deep text-xs font-bold font-mono mt-0.5">✗</span>
                <div>
                  <span className="text-sm font-semibold text-forest-deep">फ्राइड (तला हुआ): </span>
                  <span className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">डीप फ़्राई या हैवी ऑल में तल कर बनाया जाता है। फ़ैट 15-25 ग्राम/100 ग्राम तक हो सकता है, कैलोरी दोगुनी, और न्यूट्रीएंट्स डीप फ़्राइंग में नष्ट हो जाते हैं। पैकेट पर &ldquo;रोस्टेड&rdquo; लिखा होने का मतलब यह नहीं कि वह सच में भुना हुआ है — इंग्रीडिएंट्स चेक करें।</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              गोल्डन डियर का मखाना 100% रोस्टेड है। हमारी <Link href="/makhana/glossary/touchless-roasting" className="text-gold underline underline-offset-2">टचलेस रोस्टिंग</Link> प्रक्रिया में तेल में तलना नहीं, ड्राई हीट से भूनना शामिल है। हमारे <Link href="/products" className="text-gold underline underline-offset-2">सभी प्रोडक्ट्स</Link> देखें।
            </p>
          </Section>

          {/* Section 6: स्टोरेज */}
          <Section id="storage" title="मखाना को कैसे स्टोर करें">
            <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              मखाना हाइग्रोस्कोपिक है — यह हवा से नमी सोखता है, जिससे इसका कुरकुरापन कम हो जाता है। सही स्टोरेज से टेक्स्चर और स्वाद दोनों बचे रहते हैं।
            </p>
            <div className="mt-4 space-y-3">
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
                <li><strong>एयरटाइट कंटेनर:</strong> पैक खोलते ही मखाना को कांच के जार या एयरटाइट डिब्बे में डालें। पैक खुला न छोड़ें।</li>
                <li><strong>ठंडी, सूखी जगह:</strong> 30 °C से नीचे, धूप और गैस-चूल्हे से दूर रखें।</li>
                <li><strong>बंद पैक की शेल्फ़ लाइफ़:</strong> हमारे <Link href="/makhana/glossary/nitrogen-flushed-packaging" className="text-gold underline underline-offset-2">नाइट्रोजन-फ़्लश्ड</Link> पाउच 8-12 महीने तक फ़्रेश रहते हैं। पैक पर best-by डेट देखें।</li>
                <li><strong>खुले पैक की शेल्फ़ लाइफ़:</strong> खोलने के बाद 15-20 दिन में खत्म करें। इसके बाद कुरकुरापन कम होने लगता है।</li>
                <li><strong>बासी मखाना वापस क्रिस्पी कैसे करें:</strong> अगर क्रंच कम हो गया है, तो 120 °C ओवन में 3-4 मिनट या कढ़ाई में धीमी आँच पर 2 मिनट भून लें। ठंडा होने पर वापस क्रिस्पी हो जाएगा।</li>
              </ul>
            </div>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              थोक खरीदारों के लिए — <Link href="/bulk" className="text-gold underline underline-offset-2">बल्क इन्क्वायरी पेज</Link> पर पैकेजिंग के विकल्प दिए गए हैं।
            </p>
          </Section>

          {/* Section 7: बायिंग चेकलिस्ट */}
          <Section id="buying-checklist" title="सही मखाना कैसे खरीदें — चेकलिस्ट">
            <div className="mt-4 space-y-4">
              <CheckItem title="एकसार रंग — सफ़ेद से हल्का क्रीम" ok>
                अच्छा मखाना एकसार सफ़ेद से हल्का क्रीम रंग का होता है। पीलापन या भूरे धब्बे पुराने या गलत तरीक़े से सुखाए गए मखाने के संकेत हैं।
              </CheckItem>
              <CheckItem title="5-6 सूत जंबो ग्रेड (18+ mm)">
                बड़े बीज बेहतर पॉप देते हैं। अगर पैक पर सूत ग्रेड नहीं लिखा है, तो सप्लायर से पूछें। गोल्डन डियर 5-6 सूत ग्रेड का ही उपयोग करता है।
              </CheckItem>
              <CheckItem title="2% से कम टूटे हुए टुकड़े" ok>
                कुछ टूटे टुकड़े तो चलते हैं, लेकिन 2% से ज़्यादा ख़राब सॉर्टिंग या खराब हैंडलिंग का संकेत है। गोल्डन डियर की <Link href="/makhana/glossary/hand-sorting" className="text-gold underline underline-offset-2">हैंड सॉर्टिंग</Link> में 2% से कम ब्रेकेज रहता है।
              </CheckItem>
              <CheckItem title="क्रिस्पी टेक्स्चर" ok>
                ताज़ा मखाना काटने पर साफ़ क्रंच के साथ टूटता है — चबाने में हल्का और एयरी लगता है। चबाने पर अगर डेंस या च्यूई लगे, तो नमी आ गई है।
              </CheckItem>
              <CheckItem title="साफ़, नटी खुशबू — बासी या फफूँदी नहीं" ok>
                ताज़ा मखाना से हल्की नटी और थोड़ी टोस्टेड खुशबू आती है। बासी या फफूँदी जैसी गंध — मत खरीदें।
              </CheckItem>
              <CheckItem title="नाइट्रोजन-फ़्लश्ड पैकेजिंग">
                एक महीने से ज़्यादा स्टोर करने के लिए नाइट्रोजन-फ़्लश्ड पैक चुनें। यह ऑक्सीजन हटाकर मखाने को लंबे समय तक फ़्रेश रखता है।
              </CheckItem>
            </div>
            <p className="mt-4 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              गोल्डन डियर इस चेकलिस्ट के हर पॉइंट पर खरा उतरता है। <Link href="/products" className="text-gold underline underline-offset-2">रिटेल प्रोडक्ट्स</Link> और <Link href="/bulk" className="text-gold underline underline-offset-2">थोक सप्लाई</Link> के लिए देखें।
            </p>
          </Section>

          {/* Section 8: FAQ */}
          <Section id="faq" title="अक्सर पूछे जाने वाले सवाल">
            <div className="space-y-5">
              {faqMini.map((item, i) => (
                <div key={i}>
                  <h3 className="font-display text-lg text-forest-deep mb-1">{item.q}</h3>
                  <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm sm:text-base text-forest-deep/60 leading-relaxed">
              और सवालों के लिए हमारा <Link href="/faq" className="text-gold underline underline-offset-2">पूरा FAQ पेज</Link> देखें या <Link href="/makhana" className="text-gold underline underline-offset-2">इंग्लिश में पूरी मखाना गाइड</Link> पढ़ें।
            </p>
          </Section>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-forest-deep/[0.02]">
            <h2 className="font-display text-2xl sm:text-3xl text-forest-deep leading-tight">गोल्डन डियर — प्रीमियम रोस्टेड मखाना</h2>
            <p className="mt-3 text-sm sm:text-base text-forest-deep/80 leading-relaxed">
              गोल्डन डियर बिहार के किसानों से सीधा 5-6 सूत जंबो ग्रेड मखाना लाता है — टचलेस रोस्टेड, क्लीन-लेबल, नाइट्रोजन-फ़्लश्ड। हमारे क्लासिक रोस्ट में सिर्फ़ तीन इंग्रीडिएंट्स: मखाना, कोल्ड-प्रेस्ड ऑइल, और सी सॉल्ट। कोई आर्टिफ़िशियल फ्लेवर, कोई प्रिज़र्वेटिव, कोई MSG नहीं।
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-forest-deep font-medium text-sm tracking-wide transition-all hover:bg-gold-light"
              >
                मखाना खरीदें
              </Link>
              <a
                href="/bulk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold text-gold font-medium text-sm tracking-wide transition-all hover:bg-gold hover:text-forest-deep"
              >
                थोक खरीदारी के लिए संपर्क करें
              </a>
            </div>
          </div>

          <p className="mt-8 text-xs text-forest-deep/40 text-center">
            <Link href="/makhana" className="underline underline-offset-2 hover:text-gold transition-colors">Read the complete makhana guide in English &rarr;</Link>
          </p>
        </Container>
      </main>
    </>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 last:mb-0 scroll-mt-24">
      <h2 className="font-display text-2xl sm:text-3xl text-forest-deep mb-4 border-b border-gold/15 pb-2">{title}</h2>
      {children}
    </section>
  )
}

function Benefit({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-forest-deep mb-1">{title}</h3>
      <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed">{children}</p>
    </div>
  )
}

function CheckItem({ title, children, ok }: { title: string; children: React.ReactNode; ok?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${ok ? 'bg-[#1A7A3A]/10 text-[#1A7A3A]' : 'bg-gold/10 text-gold-deep'}`}>
        {ok ? '\u2713' : '?'}
      </span>
      <div>
        <span className="text-sm font-semibold text-forest-deep">{title}</span>
        <p className="text-sm sm:text-base text-forest-deep/80 leading-relaxed mt-1">{children}</p>
      </div>
    </div>
  )
}
