1. Extract the ZIP File
Right-click the zip file → "Extract All…" → Choose a folder → Extract.

2. Open in VS Code
Open Visual Studio Code.

Go to File → Open Folder… → Choose the extracted folder.

3. Create and Activate Python Virtual Environment
Open a new terminal in VS Code:

bash
Copy
Edit
# Create virtual environment
python -m venv .venv

# Activate (for PowerShell)
.venv\Scripts\Activate
4. Install Dependencies
Look for a requirements.txt or pyproject.toml. If found, run:

bash
Copy
Edit
pip install -r requirements.txt
If not found, let me know — I’ll help you recreate it.

5. Set Up the Database (PostgreSQL)
Option A: Use Docker (recommended)
If there's a docker-compose.yml, run:

bash
Copy
Edit
docker-compose up -d
Option B: Local PostgreSQL Setup
Open pgAdmin or psql

Create a new database and user matching the credentials in .env or config.py

6. Run Alembic Migrations
(Only if alembic.ini or migrations/ is present)

bash
Copy
Edit
alembic upgrade head
7. Start the FastAPI Server
bash
Copy
Edit

uvicorn main:app --reload
Visit: http://127.0.0.1:8000/docs