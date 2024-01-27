# Ignite Your GCP Cloud Architect Prep with AI-Powered Q&A!

**Harness the power of Gemini Pro for content generation.**

## Overview

This project leverages the power of Gemini Pro to generate realistic and challenging practice questions for the GCP Cloud Architect exam. By mimicking the actual exam format with multiple-choice answers, it provides an engaging and game-like experience that helps candidates solidify their knowledge and boost their confidence.

## Features

- **Content Generation power by Gemini Pro** for enhanced accuracy.

## Target Audience

Developers who want to:

- Integrate Gemini Pro's capabilities into their applications.
- Build creative content generation features applied to Cloud Computing.

## Project Structure

- **src/app/action:** This folder holds all the server actions, including the `getNextQuestion` function.
- **src/api/generative-ai:** This folder defines the API route for connecting with the Google generative AI SDK, validating the response, formatting it, and storing it in a Vercel/PostgreSQL database.
- **src/app/lib/database:** This folder defines all the functions to communicate with the database.
- **src/app/lib/utils:** This folder manages all text formatting functions used in the application.

This structure allows you to separate concerns and maintain a clean and modular codebase. It also makes it easier to scale the application as it grows. If you have any specific questions or need further guidance, feel free to ask.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set environment variables: `MODEL_NAME` and `API_KEY`.
4. Run the application: `npm run start`

## Explore Further

- **Gemini Docs:** [https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini]

## Contributing

We welcome contributions! Please see the Contributing Guidelines: [Link to contributing guidelines] for more information.

**Let's unleash the potential of Gemini Pro together!**
