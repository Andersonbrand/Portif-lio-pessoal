export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: string;
    readTime: number;
    featured: boolean;
    image: string;
    alt: string;
}

export const categories = [
    'Todos',
    'React',
    'TypeScript',
    'Node.js',
    'Performance',
    'DevOps',
    'CSS'];


export const articles: Article[] = [
    {
        id: '1',
        slug: 'react-19-novidades-e-o-que-esperar',
        title: 'React 19: Novidades e o que esperar',
        excerpt:
            'Explorando as principais mudanças do React 19 — Actions, use(), melhorias no Server Components e o que isso significa para o desenvolvimento moderno.',
        content: `
## O que há de novo no React 19

O React 19 chegou com mudanças significativas que impactam diretamente a forma como desenvolvemos aplicações. Neste artigo, vou explorar as principais novidades e como elas afetam o dia a dia do desenvolvimento.

### Actions

Uma das maiores adições é o conceito de **Actions** — uma forma padronizada de lidar com mutações de dados e estados de carregamento. Antes, precisávamos gerenciar manualmente estados como \`isPending\`, \`error\` e \`success\`. Agora, o React cuida disso automaticamente.

\`\`\`tsx
function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) return error;
      redirect("/profile");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
\`\`\`

### O hook \`use()\`

O novo hook \`use()\` permite ler recursos como Promises e Contextos diretamente no render. Isso simplifica muito o consumo de dados assíncronos.

\`\`\`tsx
import { use } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment.text}</p>);
}
\`\`\`

### Melhorias no Server Components

Os Server Components ficaram ainda mais poderosos. A integração com o ecossistema Next.js permite um controle mais fino sobre o que é renderizado no servidor vs. cliente, reduzindo o bundle size e melhorando a performance inicial.

### Conclusão

O React 19 representa uma evolução madura do framework. As mudanças são incrementais mas impactantes — especialmente para quem trabalha com formulários, mutações de dados e aplicações com muita interatividade. Vale a pena migrar gradualmente e aproveitar as novas APIs.
    `,
        category: 'React',
        tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
        author: 'Fernando Teixeira',
        publishedAt: '2025-03-10',
        readTime: 7,
        featured: true,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_12448c4e7-1772925251726.png",
        alt: 'Código React em tela de computador com fundo escuro mostrando componentes modernos'
    },
    {
        id: '2',
        slug: 'typescript-5-recursos-que-voce-precisa-conhecer',
        title: 'TypeScript 5: Recursos que você precisa conhecer',
        excerpt:
            'Decorators, const type parameters, variadic tuple types e outras features do TypeScript 5 que vão transformar sua produtividade.',
        content: `
## TypeScript 5: O que mudou

O TypeScript 5 trouxe melhorias significativas de performance e novos recursos de linguagem. Vamos explorar os mais importantes.

### Decorators (Finalmente estáveis!)

Após anos em stage experimental, os Decorators finalmente chegaram de forma estável no TypeScript 5. Eles permitem adicionar metadados e modificar o comportamento de classes e métodos de forma elegante.

\`\`\`typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Chamando \${key} com\`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class UserService {
  @log
  getUser(id: string) {
    return { id, name: 'Fernando' };
  }
}
\`\`\`

### Const Type Parameters

Agora é possível usar \`const\` em type parameters para inferência mais precisa:

\`\`\`typescript
function identity<const T>(value: T): T {
  return value;
}

const result = identity(['a', 'b', 'c']);
// Tipo inferido: readonly ["a", "b", "c"] em vez de string[]
\`\`\`

### Performance melhorada

O TypeScript 5 trouxe melhorias de 10-70% no tempo de compilação dependendo do projeto. Isso é especialmente notável em projetos grandes com muitos arquivos e tipos complexos.

### Conclusão

O TypeScript 5 é uma atualização sólida que vale a pena adotar. Os Decorators estáveis abrem novas possibilidades para frameworks e bibliotecas, enquanto as melhorias de performance beneficiam todos os projetos.
    `,
        category: 'TypeScript',
        tags: ['TypeScript', 'JavaScript', 'Types', 'Developer Experience'],
        author: 'Fernando Teixeira',
        publishedAt: '2025-02-22',
        readTime: 6,
        featured: true,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e55c2fca-1765282816550.png",
        alt: 'Editor de código com TypeScript mostrando tipos e interfaces em destaque'
    },
    {
        id: '3',
        slug: 'otimizando-performance-em-aplicacoes-nextjs',
        title: 'Otimizando performance em aplicações Next.js',
        excerpt:
            'Técnicas práticas para melhorar Core Web Vitals, reduzir bundle size e garantir uma experiência rápida para seus usuários.',
        content: `
## Performance no Next.js: Guia Prático

Performance não é opcional — é um requisito de negócio. Usuários abandonam sites lentos, e o Google penaliza páginas com Core Web Vitals ruins. Vamos ver como otimizar sua aplicação Next.js.

### Core Web Vitals

Os três principais métricas são:

- **LCP (Largest Contentful Paint)**: Tempo para renderizar o maior elemento visível
- **FID/INP (Interaction to Next Paint)**: Responsividade a interações
- **CLS (Cumulative Layout Shift)**: Estabilidade visual

### Otimização de Imagens

O componente \`<Image>\` do Next.js já faz muito, mas há configurações importantes:

\`\`\`tsx
import Image from 'next/image';

// ✅ Sempre defina width e height para evitar CLS
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Para imagens above-the-fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`

### Code Splitting Inteligente

\`\`\`tsx
import dynamic from 'next/dynamic';

// Carrega apenas quando necessário
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Para componentes que dependem do browser
});
\`\`\`

### Bundle Analysis

\`\`\`bash
# Analise seu bundle
ANALYZE=true npm run build
\`\`\`

Instale \`@next/bundle-analyzer\` e identifique dependências pesadas que podem ser substituídas ou carregadas de forma lazy.

### Conclusão

Performance é um processo contínuo. Meça, otimize, meça novamente. Use o Lighthouse e o PageSpeed Insights regularmente para monitorar suas métricas.
    `,
        category: 'Performance',
        tags: ['Next.js', 'Performance', 'Web Vitals', 'Optimization'],
        author: 'Fernando Teixeira',
        publishedAt: '2025-02-08',
        readTime: 8,
        featured: false,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_17484dfe6-1767778324866.png",
        alt: 'Dashboard de métricas de performance web mostrando gráficos de velocidade e Core Web Vitals'
    },
    {
        id: '4',
        slug: 'css-container-queries-o-futuro-do-layout-responsivo',
        title: 'CSS Container Queries: O futuro do layout responsivo',
        excerpt:
            'Como as Container Queries resolvem o problema que Media Queries nunca conseguiram — responsividade baseada no componente, não na viewport.',
        content: `
## Container Queries: Responsividade de verdade

Por anos, usamos Media Queries para criar layouts responsivos. Mas elas têm uma limitação fundamental: respondem ao tamanho da **viewport**, não do **container** onde o componente está inserido.

### O problema das Media Queries

Imagine um card de produto que precisa se comportar diferente quando está em uma sidebar estreita vs. em um grid de 3 colunas. Com Media Queries, você não consegue fazer isso de forma elegante.

### Container Queries ao resgate

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  flex-direction: column;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
  
  .card-image {
    width: 200px;
    flex-shrink: 0;
  }
}
\`\`\`

### Suporte nos browsers

Container Queries têm suporte em todos os browsers modernos desde 2023. Você pode usá-las em produção hoje!

### Container Query Units

Além das queries, temos novas unidades:

- \`cqw\` — 1% da largura do container
- \`cqh\` — 1% da altura do container
- \`cqi\` — 1% do inline size do container

\`\`\`css
.card-title {
  font-size: clamp(1rem, 3cqi, 2rem);
}
\`\`\`

### Conclusão

Container Queries são uma das adições mais impactantes ao CSS nos últimos anos. Elas permitem criar componentes verdadeiramente reutilizáveis e responsivos ao seu contexto.
    `,
        category: 'CSS',
        tags: ['CSS', 'Responsive Design', 'Layout', 'Frontend'],
        author: 'Fernando Teixeira',
        publishedAt: '2025-01-20',
        readTime: 5,
        featured: false,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8e1b61e-1772085684231.png",
        alt: 'Código CSS em tela com layout responsivo sendo demonstrado em múltiplos tamanhos de tela'
    },
    {
        id: '5',
        slug: 'node-js-streams-processando-dados-em-escala',
        title: 'Node.js Streams: Processando dados em escala',
        excerpt:
            'Aprenda a usar Streams no Node.js para processar arquivos grandes, transformar dados e construir pipelines eficientes sem estourar a memória.',
        content: `
## Node.js Streams: Eficiência no processamento de dados

Quando você precisa processar um arquivo de 10GB, carregar tudo na memória não é uma opção. É aqui que os Streams brilham.

### O que são Streams?

Streams são coleções de dados que podem não estar disponíveis de uma vez. Eles permitem processar dados em pedaços (chunks), o que é muito mais eficiente em termos de memória.

### Tipos de Streams

- **Readable**: Fonte de dados (arquivo, HTTP request)
- **Writable**: Destino de dados (arquivo, HTTP response)
- **Transform**: Transforma dados enquanto passa por eles
- **Duplex**: Readable + Writable

### Exemplo prático: Processando CSV grande

\`\`\`javascript
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';


const processLine = new Transform({
  objectMode: true,
  transform(line, encoding, callback) {
    const [name, email, age] = line.split(',');
    if (parseInt(age) >= 18) {
      this.push(\`\${name},\${email}\\n\`);
    }
    callback();
  }
});

await pipeline(
  createReadStream('users.csv'),
  // ... parse lines
  processLine,
  createWriteStream('adults.csv')
);
\`\`\`

### Backpressure

Um conceito crucial em Streams é o **backpressure** — o mecanismo que evita que um producer rápido sobrecarregue um consumer lento. O Node.js gerencia isso automaticamente quando você usa \`pipeline()\`.

### Conclusão

Streams são uma ferramenta poderosa para qualquer desenvolvedor Node.js. Dominar esse conceito permite construir aplicações que processam dados em escala sem comprometer a performance.
    `,
        category: 'Node.js',
        tags: ['Node.js', 'Backend', 'Performance', 'Streams'],
        author: 'Fernando Teixeira',
        publishedAt: '2025-01-05',
        readTime: 9,
        featured: false,
        image: "https://images.unsplash.com/photo-1605041005114-f7c7cfc94a34",
        alt: 'Servidor com cabos de rede e luzes indicando fluxo de dados em processamento'
    },
    {
        id: '6',
        slug: 'docker-para-desenvolvedores-frontend',
        title: 'Docker para desenvolvedores Frontend',
        excerpt:
            'Um guia prático de Docker focado em quem vem do frontend — containerize suas aplicações Next.js e garanta consistência entre ambientes.',
        content: `
## Docker para Frontend: Sem mistério

Docker pode parecer intimidador para quem vem do frontend, mas os conceitos são simples e os benefícios são enormes.

### Por que usar Docker?

- **Consistência**: "Funciona na minha máquina" deixa de ser um problema
- **Isolamento**: Cada projeto tem suas próprias dependências
- **Deploy simplificado**: O mesmo container roda em qualquer lugar

### Dockerfile para Next.js

\`\`\`dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Docker Compose para desenvolvimento

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
\`\`\`

### Conclusão

Docker é uma habilidade valiosa mesmo para desenvolvedores frontend. Com um Dockerfile bem configurado, você garante que sua aplicação Next.js rode de forma idêntica em desenvolvimento, staging e produção.
    `,
        category: 'DevOps',
        tags: ['Docker', 'DevOps', 'Next.js', 'Deployment'],
        author: 'Fernando Teixeira',
        publishedAt: '2024-12-18',
        readTime: 7,
        featured: true,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af9eed97-1764675856157.png",
        alt: 'Containers de carga empilhados representando a containerização de aplicações com Docker'
    }];