#  Cloud Assistant – Serverless Conversational AI with AWS

##  Project Description
Cloud Assistant is an interactive web application that acts as a cloud assistant for users, allowing them to perform AWS commands through natural language conversation using Amazon Lex. The project is built using a serverless architecture and relies on AWS services such as Amplify, Lambda, Lex, and Cognito.

##  Architecture Diagram
```
[User] --> [React Frontend (Amplify Hosting)]
          --> [Amazon Lex Bot] --> [AWS Lambda Functions]
                                 --> [AWS Services (EC2, S3, etc.)]
          --> [Cognito for Auth]
          --> [GraphQL API (AppSync)] --> [DynamoDB]
```

## Team Structure
- **Backend:** Responsible for Lambda and AppSync
- **Frontend:** Developed using React and Amplify
- **DevOps:** Handled centralized account and CI/CD
- **TeamAdmin:** Managed IAM and user roles
- The project was deployed from a central AWS account, with IAM users created per role.

## Features
- User authentication via Amazon Cognito
- Natural language chat interface using Amazon Lex
- Perform AWS tasks like:
  - `ListEC2Instances`
  - `DescribeS3Intentt`
  - `CreateEC2InstanceIntent`
- Store user data using DynamoDB
- Fully responsive UI

##  Tech Stack
- React.js + AWS Amplify
- Amazon Lex
- AWS Lambda
- Amazon Cognito
- AWS AppSync (GraphQL)
- DynamoDB

##  Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/halaassi/Cloud-computingProjectChatBotV2.git
cd Cloud-computingProjectChatBotV2
```

### 2. Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### 3. Set up Amplify Project
```bash
amplify init
amplify push
```

### 4. Start the App
```bash
npm install
npm start
```

##  IAM and Access Control

### Centralized AWS Account:
- A single master account was used with:
  - IAM Groups created:
    - FrontendDevelopers
    - BackendDevelopers
    - DevOps
  - Permissions assigned based on team roles
  - Each role had a dedicated IAM user

### Example Policies:
- Frontend: `AmazonCognitoPowerUser`, `AmazonQDeveloperAccess`
- Backend: `AWSLambda_FullAccess`, `AWSAppSyncAdministrator`
- DevOps: `AWSCloudFormationFullAccess`, `IAMFullAccess`

## Lex Intents
| Intent Name               | Description                         |
|---------------------      |-------------------------------------|
| `ListEC2Instances`        | Lists active EC2 instances          |
| `DescribeS3Intentt`       | Describes available S3 Buckets      |
| `CreateEC2InstanceIntent` | Create EC2 Instance                 |

## Screenshots
(Add screenshots showing app in action, especially Lex bot interactions)

## Example Use
> **User:** Show s3 
> **Bot:** You have 7 S3 bucket(s): amplify-cloudassistant-dev-1e80f-deployment, amplify-cloudassistant-dev-30a00-deployment, amplify-cloudassistant-dev-d6909-deployment, amplify-cloudassistant-devv-ea735-deployment, amplify-cloudbackend-dev-19d58-deployment, amplify-ecommerce-dev-10f8b-deployment, amplify-taskmanagerapp-dev-e77bf-deployment


## Deployment
```bash
amplify publish
```
Or set up CI/CD by connecting your Git branch to the AWS Amplify Console.


