// AiCreatorOS Design System: tipos das props. Global: window.AiCreatorOSDesignSystem_a9067e.
import type * as React from 'react';

type Node = React.ReactNode;
type Base = { className?: string; style?: React.CSSProperties };
type Handler<T> = (value: T) => void;

/** Os 19 glifos do sprite do kit. */
export type IconName =
  | 'arrow' | 'back' | 'diag' | 'down' | 'plus' | 'search' | 'grid' | 'pen' | 'clock' | 'alert'
  | 'image' | 'sliders' | 'save' | 'doc' | 'layers' | 'settings' | 'ruler' | 'mail' | 'list';
export type Option = string | { value: string; label: Node };
type Tone = 'positive' | 'warn' | 'neg' | 'info';

// ── Marca ──────────────────────────────────────────────
export interface WordmarkProps extends Base { mark?: boolean; word?: boolean; size?: number }
export interface IconProps extends Base, Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: IconName; size?: number;
  /** Ícone com significado: role img e aria-label; sem label fica aria-hidden. */
  label?: string;
}
export interface AnchorProps extends Base { number: Node; label: Node; dots?: boolean }
export interface LabelProps extends Base { label: Node; meta?: Node }

// ── Ações ──────────────────────────────────────────────
export interface ButtonProps extends Base, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'ink' | 'line' | 'ghost';
  /** 28, 32 (padrão) ou 40 px. */
  size?: 'sm' | 'lg';
  icon?: IconName;
  iconStart?: IconName;
  /** Quadrado só com ícone; `label` vira aria-label. */
  iconOnly?: boolean;
  label?: string;
  busy?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: Node;
}
export interface IconButtonProps extends Base, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  icon?: IconName;
  variant?: 'primary' | 'line';
  size?: 'sm' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}
export interface LinkProps extends Base, React.AnchorHTMLAttributes<HTMLAnchorElement> { href?: string; icon?: IconName; children?: Node }

// ── Campos ─────────────────────────────────────────────
interface FieldProps extends Base { id?: string; label?: Node; help?: Node; error?: Node }
export interface InputProps extends FieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'style'> { icon?: IconName; kbd?: Node }
export interface SelectProps extends FieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className' | 'style'> { options: Option[] }
export interface SwitchProps extends Base { label?: Node; 'aria-label'?: string; defaultChecked?: boolean; onChange?: Handler<boolean>; disabled?: boolean }
export interface CheckboxProps extends Base, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> { label?: Node; children?: Node }
export interface ChipGroupProps extends Base {
  options: (string | { value: string; label: Node; icon?: IconName })[];
  defaultValue?: string;
  onChange?: Handler<string>;
  label?: string;
  addLabel?: Node;
  onAdd?: () => void;
}
export interface SegmentedProps extends Base {
  options: { value: string; label: Node; icon?: IconName }[];
  defaultValue?: string;
  onChange?: Handler<string>;
  label?: string;
}
export interface TabsProps extends Base {
  options: (string | { value: string; label: Node; count?: Node })[];
  defaultValue?: string;
  onChange?: Handler<string>;
  label?: string;
}
export interface KbdProps extends Base { children?: Node }

// ── Feedback ───────────────────────────────────────────
export interface BadgeProps extends Base { tone?: Tone | 'live' | 'draft'; square?: boolean; plain?: boolean; children?: Node }
/** Sem children, `label` vira aria-label do ponto. */
export interface StatusProps extends Base { tone?: Tone | 'idle' | 'live'; label?: string; children?: Node }
export interface DeltaProps extends Base {
  direction?: 'up' | 'down' | 'flat';
  /** Cor independente da seta: good (verde), bad (vermelho), plain (sem fundo). */
  tone?: 'good' | 'bad' | 'plain';
  children?: Node;
}
/** Delta pronto ou os dados dele. */
export type DeltaInput = Node | { direction?: DeltaProps['direction']; tone?: DeltaProps['tone']; value: Node };
export interface ToastProps extends Base {
  /** positive: .toast-ok, ícone em lima sobre a tinta. */
  tone?: 'positive'; icon?: IconName; meta?: Node; children?: Node;
}
export interface BannerProps extends Base { title: Node; icon?: IconName; children?: Node }
export interface TooltipProps extends Base { label: Node; open?: boolean; align?: 'center' | 'start'; children: React.ReactElement }
export interface DialogProps extends Base {
  kicker?: Node;
  title: Node;
  children?: Node;
  actions?: Node;
  cancelLabel?: Node;
  confirmLabel?: Node;
  onCancel?: () => void;
  onConfirm?: () => void;
}
export interface MeterProps extends Base {
  label?: Node;
  value: number;
  valueLabel?: Node;
  caption?: Node;
  /** Marca de meta, em %. */
  goal?: number;
  /** true gera ['0', 'meta N%', '100%']. */
  scale?: boolean | [Node, Node | null, Node];
  small?: boolean;
  'aria-label'?: string;
}
export interface EmptyStateProps extends Base { title: Node; tone?: 'error'; icon?: IconName; actions?: Node; children?: Node }
export interface SkeletonProps extends Base { media?: boolean; lines?: number; label?: string }

// ── Leitura ────────────────────────────────────────────
export interface AvatarProps extends Base {
  initial?: string;
  src?: string;
  alt?: string;
  mark?: boolean;
  tone?: 'ink' | 'orange' | 'paper';
  size?: number;
  'aria-label'?: string;
}
export interface CardProps extends Base {
  title: Node;
  image?: string;
  imageAlt?: string;
  tag?: Node;
  meta?: Node;
  readTime?: Node;
  href?: string;
  actionLabel?: string;
  children?: Node;
}
export interface RowProps extends Base { title: Node; image?: string; imageAlt?: string; kicker?: Node; href?: string; actionLabel?: string; children?: Node }
export interface QuoteProps extends Base { kicker?: Node; author?: Node; initial?: string; avatar?: string; children?: Node }
export interface NoteProps extends Base { kicker?: Node; children?: Node }
export interface ReaderLink { href?: string; image?: string; title: Node; label?: Node }
export interface ReaderProps extends Base {
  kicker?: Node;
  title: Node;
  lead?: Node;
  author?: { name: Node; initial?: string; avatar?: string; meta?: Node };
  saveLabel?: Node | null;
  onSave?: () => void;
  figure?: { src: string; alt?: string; caption?: Node; credit?: Node };
  aside?: Node;
  prev?: ReaderLink;
  next?: ReaderLink;
  children?: Node;
}
export interface SpecProps extends Base { items: { term: Node; value: Node }[] }
export interface SlideProps extends Base {
  variant?: 'cover' | 'paper' | 'end';
  /** Só na capa. */
  image?: string;
  imageAlt?: string;
  kicker?: Node;
  title?: Node;
  note?: Node;
  /** Slide de papel: comparação em barras. */
  bars?: { label: Node; value: Node; unit?: Node; share?: number; highlight?: boolean }[];
  /** Slide de papel sem barras: número grande. */
  number?: Node;
  handle?: Node;
  page?: Node;
  children?: Node;
}

// ── Dados ──────────────────────────────────────────────
export interface DataPanelProps extends Base {
  kicker?: Node;
  title: Node;
  /** Fonte da amostra no canto: label padrão "Fonte:". */
  source?: { label?: string; value: Node; meta?: Node };
  /** Alternativa antiga a source: só a data em mono. */
  meta?: Node;
  children?: Node;
}
export interface LedgerProps extends Base {
  /** Com compare ou delta em algum item, todos ganham a linha de comparação. */
  items: { label: Node; value: Node; unit?: Node; compare?: Node; delta?: DeltaInput; note?: Node; highlight?: boolean }[];
}
export interface TargetTrackProps extends Base {
  label?: Node;
  value: number;
  target: number;
  gapLabel?: Node | null;
  targetLabel?: Node;
  /** Número sobre a ponta da barra; padrão "N%". */
  valueLabel?: Node;
  minLabel?: Node;
  maxLabel?: Node;
  /** Escala embaixo; padrão [minLabel ?? '0', '25', '50', '75', maxLabel ?? '100%']; false esconde. */
  ticks?: Node[] | false;
}
export interface MetricProps extends Base { value?: Node; unit?: Node; size?: 'sm' | 'lg'; children?: Node }
export interface StatProps extends Base {
  label: Node;
  /** Ícone numa caixa de 28 px antes do rótulo. */
  icon?: IconName;
  aside?: Node;
  value?: Node;
  unit?: Node;
  size?: 'sm' | 'lg';
  /** Variação ao lado do número (Delta). */
  delta?: Node;
  /** Texto curto ao lado do número ("leituras até o fim"). */
  note?: Node;
  viz?: React.ReactElement;
  row?: Node;
  foot?: Node;
  /** Sem card; Stats liga sozinho. */
  plain?: boolean;
}
export interface StatsProps extends Base {
  /** Máximo de colunas da faixa (padrão 8); abaixo de 860 px cai para 4 e abaixo de 560 px para 2. */
  cols?: number; ink?: boolean; children?: Node;
}
export interface SparkProps extends Base { values: number[]; height?: number; label?: string }
export interface RingProps extends Base { value: number; valueLabel?: Node; size?: 'lg' }
export interface PipsProps extends Base { total?: number; filled?: number; highlighted?: number; label?: string }
export interface SparklineProps extends Base { values: number[]; highlight?: boolean; label?: string }
export interface ChartProps extends Base {
  values: number[];
  /** Eixo x; padrão 1, 2, 3… */
  labels?: Node[];
  /** Texto da dica ("14 set"); padrão igual a labels. */
  dates?: string[];
  max?: number;
  ticks?: number;
  /** true calcula a média; número usa esse valor. */
  average?: boolean | number;
  highlight?: number | number[];
  /** Vai sobre o último índice destacado. */
  annotation?: Node;
  /** Resumo para leitor de tela. */
  label: string;
}
type Mark = 'hi' | 'on';
export interface StackBarProps extends Base { items: { value: number; tone?: Mark }[]; label: string }
export interface BreakdownProps extends Base { items: { label: Node; share: Node; value: Node; delta?: DeltaInput; tone?: Mark }[] }
export interface InsightProps extends Base { icon?: IconName; children?: Node }
export interface LegendProps extends Base { items: { label: Node; tone?: 'hi' | 'on' | 'off' | 'avg' }[] }
export interface HBarsProps extends Base { items: { label: Node; value: number; valueLabel?: Node; highlight?: boolean }[]; max?: number }
export interface FunnelProps extends Base {
  steps: { label: Node; sub?: Node; value: number; valueLabel?: Node; rateLabel?: Node }[];
  show?: 'count' | 'rate';
  /** null desliga o selo da maior queda. */
  dropLabel?: Node | null;
}
export interface PanelProps extends Base {
  /** Contexto em mono (.kick) acima do título: recorte e período. */
  kicker?: Node;
  title?: Node;
  caption?: Node;
  /** Lista de nós vai num .panel-tools. */
  tools?: Node;
  /** Painel sem respiro (article.card.panel); sections liga sozinho. */
  flush?: boolean;
  /** Faixa Stats abaixo do cabeçalho (flush). */
  stats?: Node;
  sections?: { kicker?: Node; title?: Node; caption?: Node; tools?: Node; content?: Node }[];
  children?: Node;
}
export interface SecHeadProps extends Base {
  /** Contexto em mono (.kick) acima do título. */
  kicker?: Node;
  /** h3; marque uma palavra com <em>. */
  title: Node;
  caption?: Node;
  /** À direita; lista de nós vai num .panel-tools. */
  tools?: Node;
}
export interface ToolbarProps extends Base {
  search?: string;
  searchLabel?: string;
  shortcut?: Node;
  /** Contagem em 13 px que empurra o resto para a direita. */
  note?: Node;
  /** Nós à direita, depois da nota; sem nota, o primeiro recebe to-end. */
  end?: Node[];
  children?: Node;
}
type SortKey = { sort?: string | number };
export type TableCell = Node
  | ({ value: Node; sub?: Node; best?: boolean } & SortKey)
  /** Primeira coluna: ícone do sprite ou letra no quadrado; highlight pinta o quadrado de laranja. */
  | ({ icon: IconName; title: Node; sub?: Node; highlight?: boolean } & SortKey)
  | ({ letter: Node; title: Node; sub?: Node; highlight?: boolean } & SortKey)
  /** Faixa colorida: good na meta, warn perto, bad abaixo. */
  | ({ lvl: 'good' | 'warn' | 'bad'; value: Node } & SortKey)
  /** Valor ausente: "–" em td.na, sempre no fim da ordenação. */
  | { na: true }
  | ({ share: number; value?: Node; sub?: Node; highlight?: boolean; best?: boolean } & SortKey);
export type TableRow = Record<string, TableCell> & { key?: React.Key; selected?: boolean; label?: string };
export interface TableProps extends Base {
  /** group: colunas vizinhas com o mesmo grupo ganham um cabeçalho em comum (thead de 2 linhas) e um fio .g0 na abertura. */
  columns: { key: string; label: Node; num?: boolean; sort?: 'ascending' | 'descending'; group?: Node }[];
  rows: TableRow[];
  foot?: Record<string, TableCell>;
  /** Com selectable e um Toolbar sem note, recebe a contagem de selecionadas. */
  /** Acima da toolbar; normalmente um SecHead. */
  head?: Node;
  toolbar?: Node;
  footnote?: Node;
  /** Mostra só as primeiras linhas e o rodapé "Mostrar mais"; step linhas por clique (padrão igual a limit). */
  limit?: number;
  step?: number;
  /** Variante escura (.ink no lugar do card). */
  ink?: boolean;
  /** Altura de linha: compacta 36 px, padrão 48 px, confortavel 60 px. */
  density?: 'compacta' | 'confortavel';
  /** Cabeçalhos viram botões; primeiro clique: num do maior ao menor, texto de A a Z. */
  sortable?: boolean;
  /** Coluna de seleção com "Selecionar todas"; estado inicial de row.selected. */
  selectable?: boolean;
  onSelectionChange?: Handler<React.Key[]>;
  /** Última coluna, uma ação por linha. */
  actions?: (row: TableRow) => Node;
}

// ── Produto ────────────────────────────────────────────
export interface WorkspaceProps extends Base { children?: Node }
export interface RailProps extends Base {
  items: { value: string; icon: IconName; label: string }[];
  defaultValue?: string;
  onChange?: Handler<string>;
  initial?: string;
  user?: string;
  label?: string;
}
export interface MenuProps extends Base {
  title?: Node;
  search?: string | false;
  searchLabel?: string;
  variant?: 'ink';
  sections: {
    label?: Node;
    items: { value: string; icon?: IconName; label: Node; count?: Node; status?: StatusProps['tone']; statusLabel?: string }[];
  }[];
  defaultValue?: string;
  onChange?: Handler<string>;
  label?: string;
}
export interface ContentPanelProps extends Base { crumbs?: Node[]; tools?: Node; plain?: boolean; children?: Node }
export interface MiniGridProps extends Base { list?: boolean; children?: Node }
export interface MiniProps extends Base { title: Node; image?: string; imageAlt?: string; kicker?: Node; meta?: Node; status?: Node }
export interface EditorProps extends Base {
  kicker?: Node;
  defaultTitle?: string;
  defaultText?: string;
  onChange?: Handler<string>;
  tools?: Node;
  side?: Node;
}
export interface LogProps extends Base { entries: { time: Node; title?: Node; text?: Node }[] }

type C<P> = (props: P) => React.ReactElement | null;
export interface AiCreatorOSDesignSystem {
  Wordmark: C<WordmarkProps>; Icon: C<IconProps>; Anchor: C<AnchorProps>; Label: C<LabelProps>;
  Button: C<ButtonProps>; IconButton: C<IconButtonProps>; Link: C<LinkProps>;
  Input: C<InputProps>; Select: C<SelectProps>; Switch: C<SwitchProps>; Checkbox: C<CheckboxProps>;
  ChipGroup: C<ChipGroupProps>; Segmented: C<SegmentedProps>; Tabs: C<TabsProps>; Kbd: C<KbdProps>;
  Badge: C<BadgeProps>; Status: C<StatusProps>; Delta: C<DeltaProps>; Toast: C<ToastProps>; Banner: C<BannerProps>; Tooltip: C<TooltipProps>; Dialog: C<DialogProps>;
  Meter: C<MeterProps>; EmptyState: C<EmptyStateProps>; Skeleton: C<SkeletonProps>;
  Card: C<CardProps>; Row: C<RowProps>; Quote: C<QuoteProps>; Note: C<NoteProps>; Avatar: C<AvatarProps>;
  Reader: C<ReaderProps>; Spec: C<SpecProps>; Slide: C<SlideProps>;
  DataPanel: C<DataPanelProps>; Ledger: C<LedgerProps>; TargetTrack: C<TargetTrackProps>;
  Metric: C<MetricProps>; Stat: C<StatProps>; Stats: C<StatsProps>; Spark: C<SparkProps>; Ring: C<RingProps>; Pips: C<PipsProps>;
  Sparkline: C<SparklineProps>; Chart: C<ChartProps>; StackBar: C<StackBarProps>; Breakdown: C<BreakdownProps>; Insight: C<InsightProps>; Legend: C<LegendProps>;
  HBars: C<HBarsProps>; Funnel: C<FunnelProps>; Panel: C<PanelProps>; SecHead: C<SecHeadProps>; Toolbar: C<ToolbarProps>; Table: C<TableProps>;
  Workspace: C<WorkspaceProps>; Rail: C<RailProps>; Menu: C<MenuProps>; ContentPanel: C<ContentPanelProps>;
  MiniGrid: C<MiniGridProps>; Mini: C<MiniProps>; Editor: C<EditorProps>; Log: C<LogProps>;
}
declare global {
  interface Window { AiCreatorOSDesignSystem_a9067e: AiCreatorOSDesignSystem }
}
