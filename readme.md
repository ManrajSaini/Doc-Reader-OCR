SImple Text extracting and structuring it into JSON Data with OCR and AI technology.

Using Zerox npm package (Open Source) using OCR + AI (Gpt-4O model)
Then i am using AI (gpt-4 turbo) to structure the data into json format


Refer to DOC : https://docs.google.com/document/d/1HwBatFwy2txuQQ_dhTLWFyxVZR2ePMgHtre1MadeGMU/edit?usp=sharing


How to Run it locally
1. Clone the project
2. Run npm install
3. create .env file with
    OPENAI_API_KEY=your-key-here
    OUTPUT_DIR=./output
4. Build project with 'npm run build'.
5. Upload some document locally in this project of any type (pdf, docx, png, ...)
   <img width="187" alt="Screenshot 2024-10-29 at 2 12 46 PM" src="https://github.com/user-attachments/assets/10ddce5a-8509-4ed0-adde-0abc94cb4661">
6. Then run 'npm start extract your-document-path-here'
   eg. npm start extract ./TestDocuments/adhaar.pdf



