![AI Saas Base App Template](https://github.com/user-attachments/assets/c8113507-2db1-4a24-8dc7-0579121936e3)

## Why did we open-source this?
Everyone has ideas. And we decided to make that initial phase of bringing your ideas to life much easier.

Now, if you want to build an MVP of an AI-powered SaaS, you don't have to spend several days just setting up the landing, auth logic, database, API server and so on. Simply clone this repo and go straight to the implementation of your idea.

## What is included?
This codebase includes the following:
- Minimal frontend setup with NextJS, TailwindCSS and some other libraries like GSAP (includes a basic landing page, login page, signup page, new chat page, and a main chat page)
- Allow users to create a new chat, and have conversations with an LLM in the newly created chat. Chats and Chat History are saved.
- NextAuth for Authentication, complete with Google OAuth setup
- MongoDB Atlas - cloud-based DB solution that handles saving of user accounts, chats and chat history.
- A FastAPI server with endpoints setup to provide responses from Gemini
- Gemini API integrated as the LLM powering the app
- Landing page waitlist signup email sending logic
- and more.

## FAQs

### How do we use this repository?
Follow these steps to use the repository:
- Clone or download the repository
- Rename the "env" file to ".env". This file needs to be filled up with the required env variables. Simply plug in the env variable values and you're good to go.

MONGODB_URL - Add a MongoDB URL here. You can obtain this URL from MongoDB Atlas. (You will need to create a MongoDB Atlas Account for this step) [Check this tutorial.](https://www.geeksforgeeks.org/how-to-get-the-database-url-in-mongodb/)

NEXTAUTH_URL - NextAuth Configuration (URL) [Check this tutorial](https://next-auth.js.org/configuration/options)

NEXTAUTH_SECRET - NextAuth Configuration (SECRET) [Check this tutorial](https://next-auth.js.org/configuration/options)

GOOGLE_CLIENT_ID - Google OAuth Client ID. You can obtain this from the Google Cloud Console. You must first create a Google Cloud Project. (Google Account required) [Check this tutorial](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)

GOOGLE_CLIENT_SECRET - Google OAuth Client Secret. You can obtain this from the Google Cloud Console. You must first create a Google Cloud Project. (Google Account required) [Check this tutorial](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)

EMAIL_USER - This is the email ID of the Gmail account that will be used to send the waitlist signup email. (Google Account required) [Check this to know more about how to set this up.](https://support.google.com/accounts/answer/185833?hl=en)

EMAIL_PASS - This is the generated "App Password" that will be used to login to the Gmail account for sending waitlist signup emails. (Google Account required) [Same tutorial as previous](https://support.google.com/accounts/answer/185833?hl=en)

GEMINI_API - This is your Gemini API key. (Google Account required) [Get your key here](https://ai.google.dev/gemini-api/docs/api-key)

- After adding the environment variables, simply navigate to the **interface** folder in your termninal and run the following commands:

```bash
npm i
```

- Then navigate to the **model** folder in your terminal and run the following commands:

```bash
pip install -r requirements.txt
```

- Everything is now installed. You can now run the app in two steps.

First, navigate to the **interface** folder in your terminal and run the following command
```bash
npm run dev
```

Then, navigate to the **model** folder in another terminal window and run the following command
```bash
python app.py
```

- The NextJS app and FastAPI server are now running locally for development.

### Why did we use FastAPI as a backend if we are simply calling an API?
We used FastAPI since we wanted to provide a hybrid backend that uses Python as well. We could have made function calls to the Gemini API from the NextJS app itself - but the reason we went with FastAPI is because a Python backend allows flexibility and even gives options for future expansions like adding custom LLMs, fine-tuned models and more. You can also use this Python backend to run analytics, ML algorithms, web scrapers and more.

### Why NextAuth?
Because it just made everything simple. NextAuth is currently undergoing a huge update - so this repo might have some issues in the future. 🥶

### Why is the UI so minimal?
We left the UI for this very minimal on purpose. If we had customized it to a certain style too much, there would have been extra work required for you to undo everything we have done and then work on the UI again. Leaving it barebones allows you to mould the app into whatever you want. 

### Any tips for deploying projects built with this stack?
Since the database will be hosted on MongoDB Atlas, you don't need to worry about deploying that. When it comes to the website itself, you can deploy the NextJS interface on Vercel - their Hobby plans are great and allow you to launch your site for free. As for the FastAPI server, you can use a service like Render to deploy the Python server. Be sure to change the URL of the Python server in all NextJS API calls to make calls to the deployed server instead of the localhost server in production deployments.

### Is this repo bug-free?
We can't guarantee that. There may be certain deprecated packages added and other bugs in the codebase - we would love your help in resolving these as they pop up. This will make the experience for future users of this repo much better. That being said, everything has been tested and works right out of the box, as of now.

## If you have any questions
Feel free to reach out to @Kabeer2004, @varaddeshpande15 or @itsskofficial
