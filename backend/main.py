from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import fitz

from database import engine, Base, get_db
from models import User, Document, Signature, AuditLog
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

app = FastAPI()

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Backend working with database"}


@app.post("/register")
def register(
    name: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    hashed_pw = hash_password(password)

    user = User(
        name=name,
        email=email,
        password=hashed_pw
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user_id": user.id
    }


@app.post("/login")
def login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user.password):
        return {"error": "Invalid password"}

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id
    }


@app.post("/upload")
def upload_pdf(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    document = Document(
        filename=file.filename,
        filepath=file_path,
        user_id=user_id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "message": "PDF uploaded successfully",
        "document_id": document.id
    }


@app.get("/documents")
def get_documents(
    db: Session = Depends(get_db)
):
    return db.query(Document).all()


@app.post("/signatures")
def create_signature(
    document_id: int,
    user_id: int,
    x: int,
    y: int,
    page: int,
    db: Session = Depends(get_db)
):
    signature = Signature(
        document_id=document_id,
        user_id=user_id,
        x=x,
        y=y,
        page=page,
        status="pending"
    )

    db.add(signature)
    db.commit()
    db.refresh(signature)

    return signature


@app.get("/signatures")
def get_signatures(
    db: Session = Depends(get_db)
):
    return db.query(Signature).all()


@app.put("/signatures/{signature_id}")
def update_signature_status(
    signature_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    signature = db.query(Signature).filter(
        Signature.id == signature_id
    ).first()

    if not signature:
        return {"error": "Signature not found"}

    signature.status = status

    db.commit()
    db.refresh(signature)

    return signature


@app.post("/generate-pdf/{document_id}")
def generate_signed_pdf(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if not document:
        return {"error": "Document not found"}

    signatures = db.query(Signature).filter(
        Signature.document_id == document_id,
        Signature.status == "approved"
    ).all()

    pdf = fitz.open(document.filepath)

    for sig in signatures:
        page = pdf[sig.page - 1]

        page.insert_text(
            (sig.x, sig.y),
            "SIGNED",
            fontsize=12
        )

    output_path = (
        f"uploads/signed_{document.filename}"
    )

    pdf.save(output_path)
    pdf.close()

    return {
        "message": "Signed PDF generated",
        "file": output_path
    }
@app.get("/audit-logs")
def get_audit_logs(
    db: Session = Depends(get_db)
):
    return db.query(AuditLog).all()