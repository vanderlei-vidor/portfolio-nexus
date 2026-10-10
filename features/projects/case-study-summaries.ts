import type { Locale } from "@/shared/i18n/LanguageContext";
import type { ProjectSlug } from "./registry";

export interface CaseStudySummaryContent {
  role: string;
  stack: readonly string[];
  challenge: string;
  keyDecision: string;
  evidence: string;
  result: string;
  status: string;
  statusTone: "verified" | "designed";
}

export const caseStudySummaries = {
  en: {
    "music-player": {
      role: "Product engineering · Flutter mobile",
      stack: ["Flutter", "Dart", "SQLite", "Native media APIs"],
      challenge: "Keep personal libraries, playback state and everyday controls reliable without hiding platform limits behind the interface.",
      keyDecision: "Treat queue state, audio sessions, local persistence and native controls as separate responsibilities around a local-first core.",
      evidence: "The case UI, architecture notes and lifecycle/performance plans document the direction; platform-specific audio claims remain validation targets.",
      result: "A focused player concept organized around library ownership, recoverable state and a disciplined path to release evidence.",
      status: "Designed · validation in progress",
      statusTone: "designed",
    },
    "saas-data-control": {
      role: "Backend & product engineering",
      stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "Thymeleaf / Vite"],
      challenge: "Move beyond a CRUD surface when authentication, data ownership, reporting and operational context must work as one system.",
      keyDecision: "Keep authorization and ownership checks in explicit backend layers, with scoped persistence instead of trusting the interface.",
      evidence: "Architecture, data-isolation, negative-test and CI plans define the proof path; execution artifacts for stronger security claims remain pending.",
      result: "A SaaS architecture story that connects task operations, controlled sessions, scoped data and modular reporting.",
      status: "Designed · evidence in progress",
      statusTone: "designed",
    },
    "english-tutor": {
      role: "AI product architecture · Full stack",
      stack: ["Flutter", "Dart", "FastAPI", "Python", "Local LLM"],
      challenge: "A fluent chatbot can still miss the learner's level, recurring mistakes and the next useful teaching step.",
      keyDecision: "Let a deterministic Teacher Brain choose the pedagogical move before the language model writes the response.",
      evidence: "The Teacher Brain matrix, privacy model and test plans document the architecture; pedagogical and local-runtime claims remain conditional until executed.",
      result: "A tutor concept with a teaching spine: structured memory, rule-guided progression and conversation as the delivery layer.",
      status: "Designed · validation in progress",
      statusTone: "designed",
    },
    "portfolio-nexus": {
      role: "Product design · Frontend engineering",
      stack: ["Next.js 16", "React 19", "TypeScript", "Playwright"],
      challenge: "Turn four visually distinct projects into one portfolio that explains decisions, evidence and limits with a coherent reading path.",
      keyDecision: "Resolve every case through a typed registry, generate canonical static routes and separate raw evidence from approved public claims.",
      evidence: "Production builds, Vitest, Playwright, Lighthouse reports and the evidence register provide reproducible records inside this repository.",
      result: "A multilingual static case-study system with clearer hiring paths, modular project loading and evidence-aware storytelling.",
      status: "Verified · actively evolving",
      statusTone: "verified",
    },
  },
  pt: {
    "music-player": {
      role: "Engenharia de produto · Mobile Flutter",
      stack: ["Flutter", "Dart", "SQLite", "APIs nativas de mídia"],
      challenge: "Manter bibliotecas pessoais, estado de reprodução e controles cotidianos confiáveis sem esconder limites da plataforma atrás da interface.",
      keyDecision: "Tratar fila, sessão de áudio, persistência local e controles nativos como responsabilidades separadas ao redor de um núcleo local-first.",
      evidence: "A interface do case, as notas de arquitetura e os planos de lifecycle/performance documentam a direção; claims específicos de áudio continuam como metas de validação.",
      result: "Um conceito de player focado em propriedade da biblioteca, estado recuperável e um caminho disciplinado até evidências de release.",
      status: "Designed · validação em andamento",
      statusTone: "designed",
    },
    "saas-data-control": {
      role: "Engenharia de backend e produto",
      stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "Thymeleaf / Vite"],
      challenge: "Ir além da superfície CRUD quando autenticação, propriedade dos dados, relatórios e contexto operacional precisam funcionar como um único sistema.",
      keyDecision: "Manter autorização e checagens de propriedade em camadas explícitas do backend, com persistência por escopo em vez de confiar na interface.",
      evidence: "Arquitetura, isolamento de dados e planos de testes negativos e CI definem o caminho de prova; artefatos para claims fortes de segurança seguem pendentes.",
      result: "Uma narrativa de arquitetura SaaS que conecta operação de tarefas, sessões controladas, dados com escopo e relatórios modulares.",
      status: "Designed · evidências em andamento",
      statusTone: "designed",
    },
    "english-tutor": {
      role: "Arquitetura de produto com IA · Full stack",
      stack: ["Flutter", "Dart", "FastAPI", "Python", "LLM local"],
      challenge: "Um chatbot fluente ainda pode ignorar o nível do aluno, erros recorrentes e o próximo passo pedagógico útil.",
      keyDecision: "Fazer o Teacher Brain determinístico escolher o movimento pedagógico antes do modelo de linguagem escrever a resposta.",
      evidence: "A matriz Teacher Brain, o modelo de privacidade e os planos de teste documentam a arquitetura; claims pedagógicos e de runtime local seguem condicionais até execução.",
      result: "Um conceito de tutor com espinha pedagógica: memória estruturada, progressão guiada por regras e conversa como camada de entrega.",
      status: "Designed · validação em andamento",
      statusTone: "designed",
    },
    "portfolio-nexus": {
      role: "Product design · Engenharia frontend",
      stack: ["Next.js 16", "React 19", "TypeScript", "Playwright"],
      challenge: "Transformar quatro projetos visualmente distintos em um portfólio que explique decisões, evidências e limites por um caminho de leitura coerente.",
      keyDecision: "Resolver cada case por um registry tipado, gerar rotas estáticas canônicas e separar evidência bruta de claims públicos aprovados.",
      evidence: "Builds de produção, Vitest, Playwright, relatórios Lighthouse e o registro de evidências formam provas reproduzíveis dentro deste repositório.",
      result: "Um sistema estático e multilíngue de cases, com caminhos de contratação claros, carregamento modular e narrativa orientada por evidências.",
      status: "Verified · evolução ativa",
      statusTone: "verified",
    },
  },
  es: {
    "music-player": {
      role: "Ingeniería de producto · Mobile Flutter",
      stack: ["Flutter", "Dart", "SQLite", "APIs nativas de medios"],
      challenge: "Mantener bibliotecas personales, estado de reproducción y controles cotidianos confiables sin ocultar los límites de la plataforma detrás de la interfaz.",
      keyDecision: "Tratar cola, sesión de audio, persistencia local y controles nativos como responsabilidades separadas alrededor de un núcleo local-first.",
      evidence: "La interfaz del caso, las notas de arquitectura y los planes de lifecycle/performance documentan la dirección; los claims específicos de audio siguen como metas de validación.",
      result: "Un concepto de player centrado en propiedad de biblioteca, estado recuperable y un camino disciplinado hacia evidencias de release.",
      status: "Designed · validación en curso",
      statusTone: "designed",
    },
    "saas-data-control": {
      role: "Ingeniería de backend y producto",
      stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "Thymeleaf / Vite"],
      challenge: "Ir más allá de una superficie CRUD cuando autenticación, propiedad de datos, reportes y contexto operacional deben funcionar como un solo sistema.",
      keyDecision: "Mantener autorización y controles de propiedad en capas explícitas del backend, con persistencia por alcance en vez de confiar en la interfaz.",
      evidence: "Arquitectura, aislamiento de datos y planes de pruebas negativas y CI definen el camino de prueba; los artefactos para claims fuertes de seguridad siguen pendientes.",
      result: "Una narrativa de arquitectura SaaS que conecta operación de tareas, sesiones controladas, datos con alcance y reportes modulares.",
      status: "Designed · evidencias en curso",
      statusTone: "designed",
    },
    "english-tutor": {
      role: "Arquitectura de producto con IA · Full stack",
      stack: ["Flutter", "Dart", "FastAPI", "Python", "LLM local"],
      challenge: "Un chatbot fluido todavía puede ignorar el nivel del alumno, errores recurrentes y el siguiente paso pedagógico útil.",
      keyDecision: "Hacer que el Teacher Brain determinístico elija el movimiento pedagógico antes de que el modelo de lenguaje escriba la respuesta.",
      evidence: "La matriz Teacher Brain, el modelo de privacidad y los planes de pruebas documentan la arquitectura; los claims pedagógicos y de runtime local siguen condicionados hasta su ejecución.",
      result: "Un concepto de tutor con columna pedagógica: memoria estructurada, progresión guiada por reglas y conversación como capa de entrega.",
      status: "Designed · validación en curso",
      statusTone: "designed",
    },
    "portfolio-nexus": {
      role: "Product design · Ingeniería frontend",
      stack: ["Next.js 16", "React 19", "TypeScript", "Playwright"],
      challenge: "Transformar cuatro proyectos visualmente distintos en un portfolio que explique decisiones, evidencias y límites mediante un recorrido de lectura coherente.",
      keyDecision: "Resolver cada caso con un registry tipado, generar rutas estáticas canónicas y separar evidencia bruta de claims públicos aprobados.",
      evidence: "Builds de producción, Vitest, Playwright, reportes Lighthouse y el registro de evidencias forman pruebas reproducibles dentro de este repositorio.",
      result: "Un sistema estático y multilingüe de casos, con rutas de contratación claras, carga modular y narrativa orientada por evidencias.",
      status: "Verified · evolución activa",
      statusTone: "verified",
    },
  },
} as const satisfies Record<Locale, Record<ProjectSlug, CaseStudySummaryContent>>;
