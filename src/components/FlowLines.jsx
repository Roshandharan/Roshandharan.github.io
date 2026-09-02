export default function FlowLines({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <img className="site-dna-primary" src="/assets/dna-flow-v4-blue.webp" alt="" width="1024" height="1536" decoding="async" fetchPriority="low" />
      <img className="site-dna-echo" src="/assets/dna-flow-v4-blue.webp" alt="" width="1024" height="1536" decoding="async" loading="lazy" fetchPriority="low" />
    </div>
  );
}
