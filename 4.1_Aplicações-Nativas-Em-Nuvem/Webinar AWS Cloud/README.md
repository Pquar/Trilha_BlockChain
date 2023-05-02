# Conceito de Nuvem

Alugar serviço de computação "pay-as-you-go pricing".
Befenicios:
- Investimento baixo para inciar.
- Escalabilidade Horizontal.

Como e a infraestrutura da AWS:
São divididas em [ regiões ] e [ zonas de disponibilidade(AZ) ].

Tipos de implementação:
- Nuvem
- Híbrida
- On-Premises

Tipos de Serviços:
- IaaS: Infraestrutura como serviço.
    -  cuidados: Hardware e softwares(Atualização e manutenção)
- PaaS: Plataforma como serviço.
    -   cuidados: Aplicação e dados
- SaaS: Software como serviço.
    - :)

Responsabilidade compartilhada:
- AWS: Segurança da nuvem.
- Cliente: Segurança na nuvem.

Segurança e Conformidade:

- Não utilizar a conta Root
- Habilite o MFA(Multi-Factor Authentication) na conta AWS.
- Crie usuários e grupos(use a politica do menor privilegio).
- Criptografe dados sensíveis.

##  Tecnologias:(serviços)
Formas de acesso:
- Console - web
- Cli - linha de comando
- SDK - "linguagem de programação". 

IAM: Identity and Access Management
- Conceder ou negar acesso a recursos da AWS.
- Criar e gerenciar usuários e grupos(Usufruis, Grupos, Roles).

Parameters Store:
- Armazenar e gerenciar dados de configuração e segredos.

AWS Secrets Manager:
- Armazenar, gerenciar e recuperar segredos.
- Pode fazer versionamento.

Serverless:
- Não gerenciar servidores.
EX: AWS Lambda, AWS api Gateway, AWS DynamoDB, AWS S3.
- Custo apenas pelo tempo de execução.

AWS Lambda - FaaS:
- Mais barato que EC2.
- Runtime: Node.js, Python, Java, C#, Go, Ruby ...
- triggered - Eventos que disparam a função.
- Exposição de Endpoints.
- Monitoramento e Métricas.
- Execução maxima de 15 minutos.
- Stateless: Não armazena estado(perde informação).

Api Gateway:
- Gerenciar e expor APIs.
- Cache.

AWS CloudWatch:
- Métricas e logs.
- Serve para ver como esta sua aplicação.

AWS S3.
- Armazenamento de objetos(Arquivos).
- Publicação de sites estáticos.
- Classes do s3: Glacier(arquivarem), Standard(acesso rápido), intelligent tiering(gerencia automaticamento baseado ao seu acesso ao objeto).

AWS DynamoDB:
- Provisionando(reponde baseada na demanda, pode conter problema de trotline) ou sobre demanda(provisionamento automático).

AWS CloudFormation - IaC:
- Infraestrutura como código: Json ou YAML.
- Vantagens: Versionamento, Reutilização, Facilidade de manutenção.

# Cobranças e Custos
Free Tier:
- 12 meses de uso gratuito a partir da criação da conta, alguns serviços tem um "Cota de Uso free".

[Aws Pricing Calculator:](https://calculator.aws/#/)
- Calculadora de custos dos serviços da AWS.

# Projeto pratico.
Projeto com FRONT-END no s3(static Website) e através de um triggered chamar um função lambda que vai salvar as informações no dynamoDB.

Serviços utilizados:
- AWS API Gateway.
- AWS CloudFormation.
- AWS Lambda.
- AWS DynamoDB.
- AWS S3.

Fluxo utilizado:

1. Req: O Usuário tenta entrar no site com uma Requisição para o Amazon s3 static WebSite.
2. Res: O Amazon s3 static WebSite, faz uma resposta para o Usuário do  Website estático.
> O usuário pode solicita uma alteração no de imagem de perfil.

3. req: O usuário faz uma chamada para o AWS API Gateway, afim de alterar a imagem de perfil.
4. Req: O AWS API Gateway, faz uma chamada para o AWS Lambda, invocando uma função.
5. Req: O AWS Lambda, faz uma chamada para o AWS DynamoDB, para achar o usuário.
6. Res: O AWS DynamoDB, faz uma resposta para o AWS Lambda, com os dados do usuário, se existe o usuário.
7. Req: O AWS Lambda, faz uma chamada para o AWS Media Bucket, para alterar pre-assinar um URL de upload de imagem.
8. Res: O AWS Media Bucket, faz uma resposta para o AWS Lambda, com a URL de upload de imagem.
9. Res: O AWS Lambda, retorna chamada para o AWS API Gateway, para finalizar a chamada do passo 4, com a URL de upload de imagem.
10. Res: O AWS API Gateway, faz uma resposta para o Usuário, com a URL de upload de imagem.
11. O Usuário faz uma upload da sua imagem com a URL-assinada para o AWS Media Bucket.
12. O AWS Media Bucket, apos o upload da imagem, invoca uma função Lambda.
13. O AWS Lambda, faz uma chamada para o AWS DynamoDB, para atualizar a imagem do usuário.

Assim o usuário consegue alterar a imagem de perfil.

> obs: para acessar como utilizar e cada serviço e suas funcionalidades e so pesquisar por "NomeDoServiço class docs"

[Aplicação do Projeto Pratico](https://github.com/gabrielmissio/webinar-cloud)

# Survival Guide 
- [AWS CLI](https://aws.amazon.com/cli/): The AWS Command Line Interface (AWS CLI) is a unified tool to manage your AWS services. 
- [Infrastructure as code](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/infrastructure-as-code.html): A fundamental principle of DevOps is to treat infrastructure the same way developers treat code. 
- [Serverless Framework](https://www.serverless.com/framework/docs): Extension of AWS CloudFormation - [Cloudformation Services](https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html): Configure the "infra as code" of any AWS service 
- [AWS SDK Services](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html): Use any AWS service in your JavaScript code