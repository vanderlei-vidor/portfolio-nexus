# SaaS Data Control — Performance & Otimização de Backend

> **Status:** Verified (Database & Runtime Optimization)
> **Escopo:** PostgreSQL Query Optimization, Index Strategy & Connection Pooling
> **Última Atualização:** 2026-09-28

---

## 1. Estratégia de Performance no Backend

Em aplicações multi-tenant, o maior gargalo de escalabilidade reside em contenção de banco de dados e consultas mal indexadas que executam *Full Table Scans* em tabelas com milhões de registros.

```mermaid
flowchart LR
    Request["Requisição HTTP API"] --> Filter["JwtFilter (Zero DB Lookup)"]
    Filter --> Service["Service Layer (In-memory checks)"]
    Service --> Pool["HikariCP Connection Pool (10 conexões ativas)"]
    Pool --> DB["PostgreSQL (Index Scan via tenant_id + status)"]
    DB --> Cache["Buffer Cache do SO"]
```

---

## 2. Otimizações de Banco de Dados

### 2.1 Índices Compostos Estratégicos
Como toda consulta obrigatoriamente filtra por `tenant_id`, índices de coluna única (ex: apenas `status`) geram desperdício de I/O de disco.
- **Implementação:**
  - `idx_tasks_tenant_status (tenant_id, status)`: Reduz o custo da consulta de listagem do Kanban para um *Index Scan* direto de tempo logarítmico `O(log N)`.
  - `idx_tasks_tenant_due_date (tenant_id, due_date)`: Acelera o painel de tarefas atrasadas e dashboards executivos.

### 2.2 Gerenciamento do Pool de Conexões (HikariCP)
- **Configuração:**
  - `maximum-pool-size: 10` (calculado pela fórmula da PostgreSQL `(core_count * 2) + effective_spindle_count`).
  - `minimum-idle: 5`
  - `connection-timeout: 20000ms`
  - `idle-timeout: 300000ms`
- **Impacto:** Evita o esgotamento de conexões no PostgreSQL e previne a degradação de tempo de resposta sob picos de tráfego.

### 2.3 Paginação e Projeções DTO
- Consultas de listagem utilizam **Spring Data Projections** ou construtores DTO JPQL explícitos (`SELECT new com.app.dto.TaskSummaryDTO(t.id, t.title, t.status) FROM Task t ...`), evitando carregar relacionamentos preguiçosos (*Lazy loading overhead*) e eliminando problemas de `N+1` queries.
