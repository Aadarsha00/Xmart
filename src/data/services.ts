import { 
  Cloud, 
  Shield, 
  Users, 
  Network, 
  Code, 
  Database, 
  Brain, 
  Smartphone, 
  GitBranch 
} from 'lucide-react';

export interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  useCases: { title: string; description: string }[];
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
}

export const services: Service[] = [
  {
    id: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Services',
    shortDescription: 'Scalable cloud infrastructure and migration services for modern businesses.',
    fullDescription: 'Transform your business with our comprehensive cloud solutions. We help you leverage the power of AWS, Azure, and Google Cloud to build scalable, reliable, and cost-effective infrastructure. Our certified cloud architects design and implement solutions tailored to your specific needs.',
    image: '/service-cloud.jpg',
    features: [
      'Cloud Migration & Modernization',
      'Infrastructure as Code (IaC)',
      'Serverless Architecture',
      'Multi-Cloud Strategy',
      'Cost Optimization',
      'Disaster Recovery',
      'Auto-scaling Solutions',
      'Cloud Security',
    ],
    benefits: [
      'Reduce infrastructure costs by up to 40%',
      'Scale resources instantly based on demand',
      'Improve application reliability and uptime',
      'Enable faster time-to-market',
      'Enhance data security and compliance',
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker'],
    useCases: [
      { title: 'E-commerce Platform', description: 'Scaled to handle 10x traffic during Black Friday sales' },
      { title: 'SaaS Application', description: 'Migrated legacy system to cloud-native architecture' },
      { title: 'Data Processing', description: 'Built serverless pipeline processing millions of records daily' },
    ],
    pricing: {
      starter: 'From $999/month',
      professional: 'From $2,999/month',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity',
    shortDescription: 'Comprehensive security solutions to protect your business from evolving threats.',
    fullDescription: 'Protect your digital assets with our enterprise-grade cybersecurity solutions. From threat detection to incident response, we provide end-to-end security services that keep your business safe from cyber attacks, data breaches, and compliance violations.',
    image: '/service-security.jpg',
    features: [
      'Threat Detection & Response',
      'Security Audits & Assessments',
      'Vulnerability Management',
      'Penetration Testing',
      'Compliance Management (SOC 2, GDPR, HIPAA)',
      'Security Awareness Training',
      'Incident Response Planning',
      'SIEM Implementation',
    ],
    benefits: [
      'Protect against 99.9% of cyber threats',
      'Achieve regulatory compliance',
      'Reduce security incident response time',
      'Minimize risk of data breaches',
      'Build customer trust and confidence',
    ],
    technologies: ['CrowdStrike', 'Splunk', 'Qualys', 'Nessus', 'Metasploit', 'Wireshark'],
    useCases: [
      { title: 'Financial Services', description: 'Implemented zero-trust architecture for banking client' },
      { title: 'Healthcare Provider', description: 'Achieved HIPAA compliance with comprehensive security program' },
      { title: 'E-commerce', description: 'Prevented $2M in potential fraud losses' },
    ],
    pricing: {
      starter: 'From $1,499/month',
      professional: 'From $4,999/month',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'it-consulting',
    icon: Users,
    title: 'IT Consulting',
    shortDescription: 'Strategic technology consulting to drive digital transformation.',
    fullDescription: 'Navigate the complex technology landscape with expert guidance. Our IT consulting services help you make informed decisions, optimize processes, and develop technology roadmaps that align with your business objectives.',
    image: '/service-consulting.jpg',
    features: [
      'Digital Transformation Strategy',
      'Technology Roadmap Development',
      'IT Infrastructure Assessment',
      'Process Optimization',
      'Vendor Selection & Management',
      'IT Governance Framework',
      'Business Continuity Planning',
      'ROI Analysis & Optimization',
    ],
    benefits: [
      'Align technology with business goals',
      'Reduce IT operational costs',
      'Accelerate digital transformation',
      'Improve operational efficiency',
      'Make data-driven technology decisions',
    ],
    technologies: ['TOGAF', 'ITIL', 'Agile', 'DevOps', 'Lean', 'Six Sigma'],
    useCases: [
      { title: 'Manufacturing', description: 'Reduced operational costs by 30% through process optimization' },
      { title: 'Retail Chain', description: 'Implemented omnichannel strategy increasing revenue by 25%' },
      { title: 'Logistics', description: 'Streamlined supply chain with digital transformation' },
    ],
    pricing: {
      starter: 'From $200/hour',
      professional: 'From $150/hour (retainer)',
      enterprise: 'Custom engagement',
    },
  },
  {
    id: 'network-solutions',
    icon: Network,
    title: 'Network Solutions',
    shortDescription: 'Reliable network infrastructure design, implementation, and management.',
    fullDescription: 'Build a robust, secure, and high-performance network infrastructure. Our network solutions ensure seamless connectivity, optimal performance, and maximum uptime for your organization.',
    image: '/service-network.jpg',
    features: [
      'Network Design & Architecture',
      'SD-WAN Implementation',
      'Wi-Fi Solutions',
      'Network Security',
      'Performance Optimization',
      '24/7 Network Monitoring',
      'VPN & Remote Access',
      'Network Troubleshooting',
    ],
    benefits: [
      'Achieve 99.99% network uptime',
      'Reduce network latency by 50%',
      'Secure remote workforce connectivity',
      'Simplify network management',
      'Scale network as business grows',
    ],
    technologies: ['Cisco', 'Juniper', 'Aruba', 'Palo Alto', 'Fortinet', 'Meraki'],
    useCases: [
      { title: 'Corporate HQ', description: 'Deployed enterprise Wi-Fi for 5,000+ employees' },
      { title: 'Retail Chain', description: 'Implemented SD-WAN across 200+ locations' },
      { title: 'Hospital Network', description: 'Built secure, HIPAA-compliant healthcare network' },
    ],
    pricing: {
      starter: 'From $2,500/project',
      professional: 'From $5,000/month',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'software-development',
    icon: Code,
    title: 'Software Development',
    shortDescription: 'Custom software solutions built with modern technologies and best practices.',
    fullDescription: 'From concept to deployment, we build custom software solutions that solve real business problems. Our experienced development team uses agile methodologies and modern tech stacks to deliver high-quality, scalable applications.',
    image: '/service-software.jpg',
    features: [
      'Custom Web Application Development',
      'Enterprise Software Solutions',
      'API Development & Integration',
      'Legacy System Modernization',
      'Quality Assurance & Testing',
      'DevOps & CI/CD Implementation',
      'Code Review & Optimization',
      'Maintenance & Support',
    ],
    benefits: [
      'Accelerate time-to-market',
      'Reduce development costs',
      'Build scalable applications',
      'Ensure code quality and security',
      'Get continuous support and updates',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'],
    useCases: [
      { title: 'FinTech Platform', description: 'Built trading platform processing $1B+ daily volume' },
      { title: 'Healthcare App', description: 'Developed patient management system for 50+ clinics' },
      { title: 'E-commerce', description: 'Created custom marketplace with 100K+ products' },
    ],
    pricing: {
      starter: 'From $10,000/project',
      professional: 'From $150/hour',
      enterprise: 'Custom engagement',
    },
  },
  {
    id: 'data-science',
    icon: Database,
    title: 'Data Science & Analytics',
    shortDescription: 'Transform your data into actionable insights and business intelligence.',
    fullDescription: 'Unlock the power of your data with our data science and analytics services. We help you collect, process, analyze, and visualize data to make informed business decisions and gain competitive advantages.',
    image: '/service-data.jpg',
    features: [
      'Data Strategy & Architecture',
      'Business Intelligence Solutions',
      'Predictive Analytics',
      'Data Visualization & Dashboards',
      'ETL Pipeline Development',
      'Data Warehousing',
      'Big Data Processing',
      'Real-time Analytics',
    ],
    benefits: [
      'Make data-driven decisions',
      'Identify new business opportunities',
      'Optimize operations and reduce costs',
      'Improve customer understanding',
      'Gain competitive market insights',
    ],
    technologies: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Spark', 'Hadoop', 'Snowflake'],
    useCases: [
      { title: 'Retail Analytics', description: 'Increased sales by 20% through customer segmentation' },
      { title: 'Supply Chain', description: 'Reduced inventory costs by 25% with demand forecasting' },
      { title: 'Marketing', description: 'Improved campaign ROI by 3x with attribution modeling' },
    ],
    pricing: {
      starter: 'From $5,000/project',
      professional: 'From $8,000/month',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'ai-ml',
    icon: Brain,
    title: 'AI & Machine Learning',
    shortDescription: 'Intelligent solutions that automate processes and drive innovation.',
    fullDescription: 'Harness the power of artificial intelligence and machine learning to automate processes, enhance decision-making, and create intelligent applications. Our AI experts build custom models tailored to your business needs.',
    image: '/service-ai.jpg',
    features: [
      'Machine Learning Model Development',
      'Natural Language Processing (NLP)',
      'Computer Vision Solutions',
      'Predictive Modeling',
      'Recommendation Systems',
      'Chatbots & Virtual Assistants',
      'MLOps & Model Deployment',
      'AI Strategy Consulting',
    ],
    benefits: [
      'Automate repetitive tasks',
      'Improve prediction accuracy',
      'Enhance customer experiences',
      'Reduce operational costs',
      'Gain competitive advantage',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'Scikit-learn', 'Keras'],
    useCases: [
      { title: 'Customer Support', description: 'AI chatbot handling 80% of support inquiries' },
      { title: 'Fraud Detection', description: 'ML model preventing $5M+ in fraud annually' },
      { title: 'Quality Control', description: 'Computer vision reducing defect rates by 60%' },
    ],
    pricing: {
      starter: 'From $15,000/project',
      professional: 'From $20,000/month',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
    fullDescription: 'Build engaging mobile experiences that your users will love. We develop high-performance mobile applications using the latest technologies, ensuring seamless functionality across all devices and platforms.',
    image: '/service-mobile.jpg',
    features: [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Development',
      'React Native & Flutter',
      'UI/UX Design',
      'App Store Optimization',
      'Mobile Backend Development',
      'App Maintenance & Updates',
    ],
    benefits: [
      'Reach customers on any device',
      'Build once, deploy everywhere',
      'Ensure native-like performance',
      'Reduce development costs',
      'Get continuous app support',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS Amplify'],
    useCases: [
      { title: 'Fitness App', description: 'Health tracking app with 1M+ downloads' },
      { title: 'Food Delivery', description: 'On-demand delivery platform serving 50+ cities' },
      { title: 'FinTech', description: 'Mobile banking app with biometric security' },
    ],
    pricing: {
      starter: 'From $15,000/project',
      professional: 'From $25,000/project',
      enterprise: 'Custom pricing',
    },
  },
  {
    id: 'devops',
    icon: GitBranch,
    title: 'DevOps & Automation',
    shortDescription: 'Streamline development workflows and accelerate software delivery.',
    fullDescription: 'Implement DevOps practices that bridge the gap between development and operations. We help you automate processes, improve collaboration, and deliver software faster with higher quality.',
    image: '/service-devops.jpg',
    features: [
      'CI/CD Pipeline Implementation',
      'Infrastructure as Code',
      'Container Orchestration',
      'Monitoring & Observability',
      'Automated Testing',
      'Release Management',
      'Cloud Native Development',
      'Platform Engineering',
    ],
    benefits: [
      'Deploy 10x faster',
      'Reduce deployment failures by 90%',
      'Improve team collaboration',
      'Increase system reliability',
      'Accelerate time-to-market',
    ],
    technologies: ['Kubernetes', 'Docker', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Prometheus'],
    useCases: [
      { title: 'SaaS Company', description: 'Reduced deployment time from days to minutes' },
      { title: 'E-commerce', description: 'Achieved 99.99% uptime with automated failover' },
      { title: 'Enterprise', description: 'Scaled from 10 to 1000+ microservices' },
    ],
    pricing: {
      starter: 'From $3,000/month',
      professional: 'From $8,000/month',
      enterprise: 'Custom pricing',
    },
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
