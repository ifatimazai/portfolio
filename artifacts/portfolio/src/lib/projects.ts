export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
  summary: string;
  about: string;
  challenge: string;
  solution: string;
  highlights: string[];
  gallery: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'ai-education-platform',
    title: 'AI Education Platform',
    subtitle: 'Adaptive Learning · Machine Learning',
    category: 'Machine Learning · Full Stack',
    year: '2024',
    image: '/projects/ai-education.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['Python', 'TensorFlow', 'React', 'Node.js', 'FastAPI', 'PostgreSQL'],
    summary:
      'An intelligent tutoring system that adapts curriculum and difficulty to each student\'s unique learning patterns using advanced ML models.',
    about:
      'The AI Education Platform was built to democratize quality education by personalizing the learning journey for every student. Traditional one-size-fits-all curricula leave learners behind or bored — this system monitors comprehension in real time and reshapes content delivery on the fly.\n\nThe platform analyzes quiz performance, time-on-task, error patterns, and engagement signals to build a dynamic learner model. A recommendation engine powered by collaborative filtering and knowledge graph traversal selects the next concept or practice problem with the highest expected learning gain.',
    challenge:
      'Building a system that feels responsive and personal at scale — where ML inference must complete in under 300 ms to avoid disrupting the learning flow — while keeping the model continuously updated without full retraining cycles.',
    solution:
      'The solution uses an online learning loop: a lightweight gradient-boosted ranker runs at the edge for instant recommendations, while a deeper TensorFlow model retrains nightly on accumulated session data. A Redis-backed feature store ensures sub-10 ms lookups for real-time personalization.',
    highlights: [
      'Adaptive difficulty engine with real-time learner modelling',
      'Knowledge graph with 2,000+ concept nodes and prerequisite edges',
      'Live quiz analytics dashboard with cohort comparison',
      'REST + WebSocket API — sub-300 ms recommendation latency',
      'Role-based access: student, teacher, and admin portals',
    ],
    gallery: ['/projects/ai-education.jpg'],
    featured: true,
  },
  {
    slug: 'flutter-car-showroom',
    title: 'Flutter Car Showroom',
    subtitle: 'Mobile App · Premium UI',
    category: 'Mobile Development · Flutter',
    year: '2024',
    image: '/projects/car-showroom.jpg',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Stripe'],
    summary:
      'A premium mobile application for a luxury car dealership — featuring 3D-inspired UI, real-time inventory, and an integrated booking system.',
    about:
      'Designed and developed for a high-end dealership client, this Flutter app needed to feel as refined as the vehicles it showcases. The UI draws on cinematic depth — parallax hero imagery, glassmorphism detail panels, and fluid hero transitions between the catalogue and individual car pages.\n\nThe app gives customers a full browsing experience with real-time inventory sync, HD gallery carousels, spec comparison sheets, and a booking flow that connects to the dealership\'s CRM through a Firebase backend.',
    challenge:
      'Rendering rich 60-fps animations with large high-res images on mid-range Android devices without dropped frames or jank — a common problem for flutter-heavy UI builds.',
    solution:
      'Adopted a cached network image strategy with progressive JPEG loading, pre-warmed hero animations, and shader warm-up on app start. The result is buttery 60-fps transitions across all target devices.',
    highlights: [
      'Hero parallax transitions with custom page route animations',
      'Real-time Firestore inventory with offline-first caching',
      'Stripe payment integration for booking deposits',
      'Spec comparison sheet for side-by-side model evaluation',
      '60-fps on mid-range Android via shader warm-up and image caching',
    ],
    gallery: ['/projects/car-showroom.jpg'],
    featured: true,
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    subtitle: 'Conversational AI · Context-Aware',
    category: 'AI / NLP · Full Stack',
    year: '2024',
    image: '/projects/ai-chatbot.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['Python', 'OpenAI API', 'React', 'Node.js', 'LangChain', 'Redis'],
    summary:
      'Context-aware conversational AI with long-term memory, multi-turn dialogue management, and customizable personas — built on OpenAI and LangChain.',
    about:
      'Most chatbots forget everything the moment a session ends. This platform persists conversation context across sessions, enabling genuinely continuous relationships between users and their AI assistant.\n\nLangChain orchestrates a retrieval-augmented generation pipeline: each user message is embedded, matched against a Redis vector store of past interactions, and the top-k relevant memories are injected into the prompt. The system also supports multiple custom personas, each with distinct system prompts, tone rules, and domain knowledge.',
    challenge:
      'Managing prompt window size gracefully when conversation histories grow large — naively injecting all context exceeds token limits and degrades response quality.',
    solution:
      'A hierarchical summarisation strategy compresses old context into rolling summaries stored separately from raw logs. Only the summary plus the most recent N turns are injected, keeping prompts tight and costs predictable.',
    highlights: [
      'Persistent memory across sessions via Redis vector store',
      'LangChain RAG pipeline with semantic context retrieval',
      'Multiple configurable AI personas with distinct tone and knowledge',
      'Streaming responses with real-time token rendering',
      'Usage dashboard with token consumption and cost analytics',
    ],
    gallery: ['/projects/ai-chatbot.jpg'],
  },
  {
    slug: 'sentiment-analysis-tool',
    title: 'Sentiment Analysis Tool',
    subtitle: 'Real-Time NLP · Data Visualization',
    category: 'Data Science · NLP',
    year: '2023',
    image: '/projects/sentiment-analysis.jpg',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React', 'D3.js', 'Kafka'],
    summary:
      'Real-time sentiment analysis engine for social media streams — ingesting Twitter/X data through Kafka and visualising sentiment trends on an interactive dashboard.',
    about:
      'Sentiment data is only valuable when it\'s live. This tool ingests the public Twitter/X Streaming API through an Apache Kafka pipeline, classifies each tweet using a fine-tuned BERT model, and updates a live React dashboard without a page refresh.\n\nThe analytics surface includes emotion breakdown (joy, anger, fear, surprise) via a multi-label classifier, geographic heat maps rendered with D3.js, and configurable keyword tracking for brand monitoring.',
    challenge:
      'Keeping end-to-end latency under 2 seconds from tweet publication to dashboard update while running BERT inference at scale on CPU-only infrastructure.',
    solution:
      'Batched Kafka consumer with dynamic batch sizing, model quantisation (INT8) cutting inference time by 60%, and a WebSocket push channel from FastAPI to the React client.',
    highlights: [
      'Sub-2 second tweet-to-dashboard latency on CPU infrastructure',
      'Fine-tuned BERT with multi-label emotion classification',
      'Kafka pipeline handling 1,000+ tweets/minute sustained',
      'Interactive D3.js geographic heat map and time-series charts',
      'Configurable keyword and hashtag tracking for brand monitoring',
    ],
    gallery: ['/projects/sentiment-analysis.jpg'],
  },
  {
    slug: 'task-manager-app',
    title: 'Task Manager App',
    subtitle: 'Full Stack · Team Collaboration',
    category: 'Full Stack · Productivity',
    year: '2023',
    image: '/projects/task-manager.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'TypeScript'],
    summary:
      'Full-featured project management app with a drag-and-drop kanban board, priorities, deadlines, and real-time team collaboration via WebSockets.',
    about:
      'Built as an alternative to heavyweight project tools, this task manager puts clarity first. The drag-and-drop kanban board handles complex projects without cognitive overhead — cards carry priorities, deadlines, assignees, labels, and file attachments in one scannable view.\n\nReal-time collaboration is powered by Socket.io: any team member\'s action (moving a card, adding a comment, changing a status) broadcasts instantly to all connected clients, eliminating the stale-state refresh cycle.',
    challenge:
      'Implementing drag-and-drop in a way that feels instant but correctly reconciles optimistic UI updates with server state under concurrent edits from multiple users.',
    solution:
      'Optimistic updates applied client-side immediately; conflict resolution via operational transforms on the server, with a rollback path for rejected operations. Users see their changes instantly; conflicts silently resolve.',
    highlights: [
      'Drag-and-drop kanban with optimistic UI and conflict resolution',
      'Real-time multi-user collaboration via Socket.io',
      'Priority tiers, deadlines, labels, file attachments per card',
      'Activity feed and comment threads per task',
      'Workspace-level analytics: velocity, completion rate, workload',
    ],
    gallery: ['/projects/task-manager.jpg'],
  },
  {
    slug: 'medical-ai-system',
    title: 'Medical AI System',
    subtitle: 'Deep Learning · Medical Imaging',
    category: 'AI / Computer Vision · Healthcare',
    year: '2024',
    image: '/projects/medical-ai.jpg',
    githubUrl: 'https://github.com/ifatimazai',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'DICOM', 'React'],
    summary:
      'AI-assisted diagnostic tool for medical image analysis — using deep convolutional networks to segment and highlight anomalies in MRI and CT scans.',
    about:
      'Radiological image reading is time-intensive and prone to fatigue-related errors. This system assists clinicians by automatically segmenting regions of interest in MRI and CT DICOM files, overlaying probability maps that highlight potential anomalies for human review.\n\nThe segmentation model is a U-Net variant fine-tuned on a curated dataset of annotated scans. The web interface allows clinicians to load studies, step through slices, adjust overlay opacity, and export structured reports — all within HIPAA-compliant infrastructure.',
    challenge:
      'Medical imaging datasets are small and highly sensitive; training a robust deep-learning model without overfitting on limited annotated data.',
    solution:
      'Aggressive data augmentation (elastic deformations, random flips, intensity shifts) combined with transfer learning from a pre-trained ImageNet backbone, plus Monte Carlo dropout for uncertainty quantification per prediction.',
    highlights: [
      'U-Net segmentation model with 94% Dice coefficient on test set',
      'DICOM file ingestion with multi-slice viewer',
      'Uncertainty-aware predictions via Monte Carlo dropout',
      'Structured report export (PDF + JSON) per study',
      'HIPAA-aligned data handling with encrypted storage at rest',
    ],
    gallery: ['/projects/medical-ai.jpg'],
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
