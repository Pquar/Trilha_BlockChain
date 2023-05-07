# Conceitos
- Smart Contracts: Prevê o controle de acesso dos dados, definindo regras de manutenção do estado global(ledger), so pessoas que autorizadas podem fazer alterações no estado global.

- Consensus: Consenso é o processo de chegar a um consenso entre os participantes da rede, para que todos os nós da rede tenham a mesma visão do estado global, sincronizada e com participantes apropriados. Funções que alteram o estado global precisam atingir um consenso antes de serem aplicadas.

- Assets: Ativos são os dados que são armazenados no estado global(tangíveis ou intangível), e são acessados por meio de transações, em fabric são armazenados em formato de chave-valor representados como:binário ou json.

- Chaincode: É o código que é executado para definir o Asset/s, e as regras de manutenção do estado global(transações, modificações).

- Ledger: É o estado global da rede(BlockChain), onde são armazenados os dados dos ativos, e as transações que alteram o estado global, Existe um ledger por canal no Peer, cada Peer mantém um cópia do Ledger. do canal do qual e membro, ex: Peer1: possui 5 canais(ledger1, ledger2, ledger3, ledger4, ledger5); Peer2: possui 3 canais(ledger1, ledger2, ledger3).

- Privacity: Canal de transações privadas. Private Data Collections - segrega os dados em um banco de dados privado, separado do canal do ledger, acessível apenas  a organizações que possuem acesso ao subconjunto privado .

## Componentes
Peer, Orderer Service, Organizations, Applications, CA (Certificate Authority) e Network Configuration.
- Peer: Conter o State DataBase e o Ledger.
- Orderer Service: ledger responsável pela ordem  ou sincronização das transações.
- CA: Controle de Identidades.
- Organizations: Organizações que participam da rede.
- Applications: Aplicações que interagem com a rede.
- Network Configuration: Configuração da rede(configtx.yaml).

### Etapas do processo de criação de um rede 
1. Acordo e definir a configuração
2. Configuration Block, criado por configtxgen >apardir deste aquivo e definido configtx.yaml.
3. [x] Configuration Block = Canal existe logicamente.
4. Configuration Block <=  armazenado organizações que podem interagir, componentes e polices
5. CA(Certificate Authority) = Criar as identidades associadas as organizações.
6. Peers = hospedam o ledger e o ChainCode ou smart contract.
7. Orderer Service = responsável pela ordem ou sincronização das transações.

# Identity
Atores: elementos da rede, peers, orderer, client application, administradores ... .
- Identity: determina a permissão sobre os recursos(encapsulados dentro do certificado x509).
- MSP(Membership Service Provider): Componente que gerencia a identidade de um ator, e é responsável por validar a identidade de um ator, e por fornecer a lista de membros da rede.
- PKI(Public Key Infrastructure): Lista de identidades.
- Fabric CA: Criação das CA's, em ambiente de teste.(PRIVATE ROOT)
- CA provider: Administras as identidades digitais.

# Policy
Configura e define a estrutura de governança da rede(decisões, resultados alcançados, direitos dos Asset's e seus dados privados).

ACL: Access Control Lists, configuração do acesso aos recursos do Fabric.

Signature Policies: Usuários que podem assinar uma order para a politica ser satisfeita.

# Applications and Peers

Interação entre applications e peers

1. Proposta de transação e endorsement(Proposta de Transação,Transaction Execution, Transaction endorsement )
2. Submissão da transação e ordering(Transaction submission, Transaction ordering )
3. Transaction Validation and Commit (Transaction validation, Transaction commit, commit event)
todo o processo de fluxo da transação se chama de Consensus.
