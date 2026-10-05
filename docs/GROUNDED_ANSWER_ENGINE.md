# GRAVIFIRE grounded answer engine

GRAVIFIRE answers questions from generated local evidence only:

1. validated NASA experiment records
2. linked NASA evidence-asset metadata
3. page-aware NASA technical-report chunks

The current provider is deterministic lexical retrieval plus structured field composition. It does not call an external model, use embeddings, or answer from general scientific knowledge.

Every response contains an answer status, evidence coverage, evidence sources, citations, and limitations. Structured run facts use citations such as `PSI-25:Test-B1`; document chunks use citations such as `NTRS-20210011385:p31`; raw video metadata uses `PSI-25:B1:RAW-VIDEO`.

The `GroundedAnswerProvider` interface in `src/lib/grounded-query.ts` is the future seam for an LLM provider. A future provider must receive only the user query and retrieved evidence, and its citations must be validated against supplied evidence before display.

Unsupported causal questions intentionally return `INSUFFICIENT_EVIDENCE`. Investigation-level documents are not presented as direct run-level evidence unless a deterministic identifier link is verified.
