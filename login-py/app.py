from datetime import datetime, timedelta
from pathlib import Path

import jwt
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
security = HTTPBearer()

SECRET_KEY = "secret123"
ALGORITHM = "HS256"

# Dummy user
USER = {
    "username": "admin",
    "password": "1234"
}


class LoginRequest(BaseModel):
    username: str
    password: str


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


@app.get("/")
def login_page(request: Request):
    return templates.TemplateResponse(request, "login.html")


@app.post("/login")
def login(data: LoginRequest):
    if data.username == USER["username"] and data.password == USER["password"]:
        token = jwt.encode(
            {
                "sub": data.username,
                "exp": datetime.utcnow() + timedelta(minutes=30),
            },
            SECRET_KEY,
            algorithm=ALGORITHM,
        )
        return {"token": token}

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")


@app.get("/dashboard")
def dashboard(payload: dict = Depends(verify_token)):
    return {"message": f"Welcome to dashboard, {payload.get('sub')}!"}
