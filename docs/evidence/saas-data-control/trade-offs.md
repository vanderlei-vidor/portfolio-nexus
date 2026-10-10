# SaaS Data Control — Decisões de Engenharia & Trade-offs

> **Status:** Verified (System Design & Trade-offs)
> **Escopo:** Trade-offs de Multi-tenancy, Modelo de Sessão e Pipeline de Relatórios
> **Última Atualização:** 2026-09-28

---

## 1. Matriz de Decisões e Trade-offs

| Dimensão | Opção Escolhida | Alternativa Rejeitada | Racional / Justificativa | Trade-off Aceito |
| :--- | :--- | :--- | :--- | :--- |
| **Isolamento de Dados Multi-tenant** | **Banco Compartilhado com Coluna `tenant_id` Obrigatória** | Database-per-tenant ou Schema-per-tenant | Menor custo de infraestrutura, facilidade de migração com Flyway e pool de conexões único e eficiente. | Requer rigor absoluto no código: cada query deve conter `tenant_id` para evitar vazamento acidental. |
| **Autenticação de APIs** | **JWT Stateless de Vida Curta + Refresh Token no Banco** | Sessões HTTP Stateful com Redis | Permite escalabilidade horizontal dos nós do Spring Boot sem sincronização de sessão em cluster. | Invalidação imediata do Access Token só ocorre após a expiração de 15 minutos (ou via blacklist temporária). |
| **Geração de Relatórios** | **Streaming síncrono controlado com paginação JDBC** | Worker assíncrono em fila Kafka/RabbitMQ | Simplicidade operacional para o estágio do produto, sem necessidade de infraestrutura de mensageria complexa. | Requisições de relatórios muito extensos retêm a thread do Spring por alguns segundos. |
| **Controle de Transações** | **`@Transactional` com Isolamento READ_COMMITTED padrão** | Isolamento SERIALIZABLE | Evita deadlocks frequentes e alto overhead de concorrência em operações diárias de criação de tarefas. | Exige tratamento de conflitos no nível da aplicação em casos raros de edição simultânea da mesma tarefa. |

---

## 2. Análise Profunda das Escolhas

### 2.1 Multi-tenancy: Shared Database vs. Database-per-tenant
* **Contexto:** Plataformas SaaS em estágio inicial ou médio precisam equilibrar orçamento e segurança.
* **Avaliação:** Criar um banco de dados por cliente (Database-per-tenant) isola 100% no nível do disco, mas multiplica o custo de conexões, migrations e gerenciamento de infraestrutura por centenas de instâncias.
* **Decisão do Task Manager Pro:** Banco compartilhado com isolamento lógico no repositório (`tenant_id`), reforçado por testes de integração automatizados que tentam intencionalmente consultar dados de outros tenants com tokens válidos (Testes Negativos de IDOR).

### 2.2 Política de Honestidade Técnica sobre Volume de Testes
* **Regra do Roadmap:** O roadmap proíbe alegações como "104 testes unitários e 100% de cobertura" sem anexação do relatório de execução correspondente.
* **Posicionamento:** A narrativa do case destaca a **qualidade do desenho dos testes de segurança e arquitetura de dados**, em vez de inflar números quantitativos arbitrários sem prova rastreável.
