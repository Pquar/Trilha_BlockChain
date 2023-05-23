## Tipos de  BlockChain

- Publica(Bitcoin, Ethereum), qualquer pessoa consegue entrar na rede e ver as transações e se tornar um no da rede e validar as transações.
- Privada(Hyperledger, HyperLedger Besu), precisa de permissão para entrar na rede, e só quem tem permissão pode validar as transações, pode estarem em VPN.

- Privada + Permissionada, precisa de permissão para entrar na rede, e só quem tem permissão pode validar as transações, e só quem pode interagir com a rede.

## O que HyperLeger Fabric

- DLT(Distributed Ledger Technology) ou framework.

- Privado e permissionado(precisa de permissão para entrar na rede).

- Sem custo de transação, sem gas, mas gasta recurso computacional

- Desenvolvido para empresas.

- Escrito em goLang.

- Modular e configurável, ex: fazer rede separadas de contratos, atualizar contratos sem parar a rede.

- Suporta a Java, Go, Node.js e Python.

- Permite transações privadas, ou seja, só quem tem permissão pode ver as transações.

## Principais Características

| Componentes |  Característica |
| ------ | ------ |
| Ledger | Livro Razão, Divido em BlockChain cadeia de blocos e estado atual que e o estado atual do "block" |
| Chaincode | Smart Contracts |
| Certificate Authorities CA | Autoridades certificadoras, emite identidades para entidades da rede |
| Consensus | Algorítimo de Consenso ou Raft |
| Orderer | Ordenador, matem todos os peers organizados e empacota em blocos e envia para outros peers, alem de ordenar os blocos |
| Peers | Pares, rodam as funções e "tentam concorda" com o resultado com a função e enviam para o order, guarda o ledger versão do contrato e o canal que são as entidades que fazem parte da rede | 
| Channels | Canais, são divisões logicas da rede. |

## Funcionamento de Contratos

- Podem ser escritos e desenvolvidos em múltiplas linguagens.

- São executados pelos peers da rede, ou todos depende da Politica de endorso.

- Interagem como estado da blockChain, ler, alterar, criar e excluir registros no ledger.

- contratos podem ser versionados, podem ser atualizados.

- "Devem" ser Determinísticos, ou seja, sempre que executados com os mesmos parâmetros, devem retornar o mesmo resultado.

| função |  resultado |
| ------ | ------ |
| getState(chave) | busca um registro com a chave especifica na blockchain |
|putState(chave, valor)| Adiciona(ou substitui, se ja existir) um registro com chave especificada e o valor especificado|
|delState(chave)| Remove um registro com a chave especificada|

## Onde implantar?

- Amazon Managed Blockchain
- IBM Blockchain Platform
- Oracle blockchain platform


## Lições da Atividade Prática.

A atividade prática foi feita em Node.js, e o contrato foi feito em javascript, o contrato tem as operações basicas de crud e foi adicionados mais funções para exemplificar o funcionamento do ledger.

As coisas são salvas no ledger por meio de buffer de bytes, então para trabalhar com os itens e as funções, precisamos 
transformar de buffer para objetos em javascript e o inverso para salvar este objetos no ledger.

Quando colocamos _ na frente da função(_nomeFunção) significa que ela é privada, ou seja, não pode ser chamada por outros contratos.

Evaluate Transaction -> Não Altera nada na rede, a politica de endorso não e aplicada.(Não cria um bloco)

Submit Transaction -> Pode alterar o estado da rede, a politica de endorso e aplicada, e todos os peers são consultados dependendo da politica aplicada.(Cria um bloco)
