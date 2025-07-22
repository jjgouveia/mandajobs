# Documentação do Design System - Manda Jobs

## Sumário
- [Introdução](#introdução)
- [Fundamentos](#fundamentos)
  - [Cores](#cores)
  - [Tipografia](#tipografia)
  - [Espaçamento](#espaçamento)
  - [Bordas e Sombras](#bordas-e-sombras)
- [Tokens](#tokens)
- [Componentes](#componentes)
  - [Layout](#layout)
  - [Navegação](#navegação)
  - [Formulários](#formulários)
  - [Feedback](#feedback)
  - [Exibição de Conteúdo](#exibição-de-conteúdo)
- [Bibliotecas e Ferramentas](#bibliotecas-e-ferramentas)
- [Animações](#animações)
- [Acessibilidade](#acessibilidade)
- [Boas Práticas](#boas-práticas)

## Introdução

O Design System do Manda Jobs foi criado para garantir consistência visual e funcional em toda a plataforma. Este sistema integra componentes de UI modernos, animações fluidas e um esquema de cores que refletem a identidade da marca, fornecendo uma experiência de usuário coesa e intuitiva.

O design utiliza principalmente um esquema de cores escuro com acentos em tons de roxo e azul, proporcionando uma aparência moderna e profissional que se alinha com o propósito da plataforma de conectar profissionais a oportunidades de emprego através de IA.

## Fundamentos

### Cores

O Manda Jobs utiliza um sistema de cores baseado em variáveis CSS e tokens do Tailwind, com suporte a temas claro e escuro. O tema principal é o escuro, com fundo em tons de cinza escuro/preto e acentos coloridos.

**Cores Principais:**

- **Fundo:** `bg-[#141417]` (tema escuro principal)
- **Texto:** `text-white` / `text-gray-100` / `text-gray-300` / `text-gray-400`
- **Primária:** `text-purple-400` / `text-purple-500` (tons de roxo para elementos principais)
- **Secundária:** `text-blue-400` / `text-blue-500` (tons de azul para destaques secundários)
- **Acentos:** Gradientes como `from-purple-500 to-pink-500` (usado em elementos de destaque)

**Variáveis CSS (via Tailwind):**
```css
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--popover: 240 10% 3.9%;
--popover-foreground: 0 0% 98%;
--primary: 300 100% 50%;
--primary-foreground: 0 0% 100%;
--secondary: 240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 0 0% 98%;
--border: 240 3.7% 15.9%;
--input: 240 3.7% 15.9%;
--ring: 240 4.9% 83.9%;
```

Os elementos de UI também utilizam fundos com transparência e efeitos de blur para criar profundidade:
- `bg-white/5` (fundo branco com 5% de opacidade)
- `backdrop-blur-sm` (leve desfoque de fundo)

### Tipografia

O Manda Jobs utiliza uma combinação de fontes modernas e legíveis:

- **Títulos (h1, h2):** "Space Grotesk" (sans-serif)
- **Corpo de texto:** "Bricolage Grotesque" (sans-serif)

**Tamanhos de fonte:**
- Títulos grandes (Hero): `text-[5rem]` até `text-8xl`
- Títulos de seção: `text-2xl` / `text-xl`
- Subtítulos: `text-lg`
- Corpo de texto: `text-base` / `text-sm`
- Texto pequeno: `text-xs`

**Pesos de fonte:**
- `font-bold` (700)
- `font-semibold` (600)
- `font-medium` (500)
- `font-normal` (400)

### Espaçamento

O sistema de espaçamento segue a escala padrão do Tailwind CSS, com uso frequente de:

- `p-2`, `p-4`, `p-6` (padding geral)
- `px-4`, `py-2` (padding horizontal/vertical)
- `m-2`, `m-4`, `m-6` (margin geral)
- `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12` (espaçamento entre itens em flex/grid)
- `space-y-4`, `space-x-4` (espaçamento entre filhos)

### Bordas e Sombras

- **Bordas:** `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- **Espessuras de borda:** `border`, `border-2`
- **Cores de borda:** `border-white/10`, `border-slate-500/30`, `border-gray-300`
- **Sombras:** `shadow-sm`, `shadow-md`, `shadow-lg`

## Tokens

O Design System utiliza tokens do Tailwind CSS, definidos em `tailwind.config.js`, com suporte a variáveis CSS para temas. Os tokens são acessados via classes Tailwind com prefixos como `bg-`, `text-`, `border-`, etc.

Principais categorias de tokens:
- **Cores:** Define toda a paleta de cores, incluindo variações para temas claro/escuro
- **Espaçamentos:** Segue o padrão do Tailwind (escala de 0.25rem a 64rem)
- **Border-radius:** `sm`, `md`, `lg` que são mapeados para variáveis CSS
- **Animations:** Definições para animações como `accordion-up`, `accordion-down`, `scroll-left`

## Componentes

O Manda Jobs utiliza uma combinação de componentes personalizados e componentes de bibliotecas como shadcn/ui e Headless UI.

### Layout

#### Card
```tsx
<Card className="bg-white/5 border-white/10 backdrop-blur-sm">
  <CardContent className="p-6">
    {/* Conteúdo */}
  </CardContent>
</Card>
```

O componente `Card` é usado extensivamente para agrupar informações relacionadas, com um estilo consistente de fundo semi-transparente, bordas sutis e cantos arredondados.

#### Container
Os elementos de layout seguem o padrão do Tailwind CSS:
```tsx
<div className="container mx-auto px-6">
  {/* Conteúdo */}
</div>
```

#### Grid/Flex
O projeto utiliza layouts flexíveis e responsivos:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
  {/* Itens do grid */}
</div>

<div className="flex items-center justify-between">
  {/* Itens flex */}
</div>
```

### Navegação

#### Header
O cabeçalho inclui navegação principal e toggle de tema escuro/claro.

#### Footer
O rodapé (`FooterExperimental`) usa um design moderno com gradiente de fundo, seções para informações da marca, links de navegação e produtos, além de links sociais.

#### Links
```tsx
<Link 
  href="/caminho" 
  className="text-gray-300 hover:text-white transition-colors duration-200"
>
  Link Text
</Link>
```

#### Botões de navegação
```tsx
<Button
  variant="outline"
  size="lg"
  className="group"
>
  <span>Label</span>
  <Icon className="ml-2 group-hover:translate-x-1 transition-transform" />
</Button>
```

### Formulários

#### Input
```tsx
<div className="space-y-2">
  <Label htmlFor="input-id">Título</Label>
  <Input 
    id="input-id"
    placeholder="Placeholder" 
    className="bg-white/5 border-white/10 text-white"
  />
</div>
```

#### Select
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Selecionar" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opção 1</SelectItem>
    <SelectItem value="option2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

#### Button
```tsx
<Button 
  variant="default" // ou "outline", "ghost", "link"
  size="default" // ou "sm", "lg"
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
>
  <Sparkles className="mr-2 h-4 w-4" />
  Texto do Botão
</Button>
```

### Feedback

#### Toast
Usando react-hot-toast para notificações:
```tsx
import { toast } from "react-hot-toast";

// Uso
toast.success("Operação concluída com sucesso!");
toast.error("Ocorreu um erro.");
```

#### Loading
```tsx
{loading ? (
  <div className="flex justify-center items-center space-x-2">
    <Spinner className="animate-spin" />
    <span>Carregando...</span>
  </div>
) : (
  /* Conteúdo */
)}
```

#### Badges
```tsx
<Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
  Em breve
</Badge>
```

### Exibição de Conteúdo

#### Modal
Usando HeadlessUI para modais acessíveis:
```tsx
<Dialog open={isOpen} onClose={setIsOpen}>
  <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
  <DialogContent className="bg-white/5 border-white/10 rounded-xl p-6">
    <DialogHeader>
      <DialogTitle>Título do Modal</DialogTitle>
      <DialogDescription>Descrição do modal...</DialogDescription>
    </DialogHeader>
    
    <div className="mt-4">
      {/* Conteúdo */}
    </div>
    
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>Fechar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Bibliotecas e Ferramentas

O Design System do Manda Jobs é construído com as seguintes tecnologias:

1. **Framework UI:**
   - **Tailwind CSS**: Framework de CSS utilitário para estilização
   - **shadcn/ui**: Componentes reutilizáveis baseados em Radix UI (estilo "new-york")

2. **Bibliotecas de Componentes:**
   - **Headless UI**: Componentes sem estilo para construção de interfaces acessíveis
   - **Radix UI**: Primitivos de UI acessíveis e personalizáveis

3. **Ícones:**
   - **Lucide Icons**: Biblioteca de ícones SVG (definido em components.json)
   - **Heroicons**: Biblioteca de ícones SVG utilizada em alguns componentes

4. **Animações:**
   - **Framer Motion**: Biblioteca para animações avançadas
   - **CSS nativo**: Keyframes para animações simples

5. **Utilidades:**
   - **clsx/tailwind-merge**: Para combinação condicional de classes CSS
   - **class-variance-authority**: Para gerenciar variantes de componentes

## Animações

O Design System inclui várias animações para melhorar a experiência do usuário:

1. **Transições de hover/focus:**
   ```css
   .transition-colors
   .transition-transform
   .transition-opacity
   .duration-200
   ```

2. **Animações de entrada/saída:**
   ```css
   .animate-fade-up
   .animate-once
   .animate-duration-500
   ```

3. **Animações decorativas:**
   - Efeito "ball" com gradientes animados no fundo
   - Animações de rolagem para carrosséis (marquee)
   - Animação de cubo 3D na página inicial

4. **Framer Motion:**
   ```tsx
   <AnimatePresence>
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.3 }}
     >
       {/* Conteúdo */}
     </motion.div>
   </AnimatePresence>
   ```

## Acessibilidade

O Design System do Manda Jobs segue práticas de acessibilidade, incluindo:

- Uso de atributos `aria-` apropriados
- Contraste adequado entre texto e fundo
- Feedback visual e textual para estados de interação
- Suporte a navegação por teclado
- Componentes acessíveis do Headless UI e Radix UI

Exemplos:
```tsx
<button aria-label="Fechar modal">...</button>
<Link href="..." target="_blank" rel="noreferrer">...</Link>
```

## Boas Práticas

Para manter a consistência do Design System, siga estas práticas:

1. **Sempre use os componentes existentes** em vez de criar novos quando possível
2. **Siga os padrões de cores** definidos no arquivo tailwind.config.js
3. **Utilize classes utilitárias do Tailwind** em vez de CSS personalizado
4. **Mantenha a responsividade** usando os breakpoints padrão do Tailwind:
   - `sm`: 640px
   - `md`: 768px
   - `lg`: 1024px
   - `xl`: 1280px
   - `2xl`: 1536px
5. **Prefira componentes compostos** (Card + CardHeader + CardContent) para manter estrutura consistente
6. **Utilize animações com moderação** para não prejudicar a performance
7. **Siga as convenções de nomenclatura**:
   - Props em camelCase
   - Componentes em PascalCase
   - Variantes em kebab-case para classes CSS
8. **Documente novos componentes** adicionando-os a esta documentação
