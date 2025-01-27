---
title: 路由建模
lang: zh-CN
---

## 犯罪数据模型和数据库连接

蝙蝠侠设计了一个数据模型来表示犯罪数据，包括有关犯罪、嫌疑人和地点的信息。他决定使用 SQLite 数据库来存储数据，并使用 ORM（对象关系映射）库与数据库交互。

```py
# models.py
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./gotham_crime_data.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

class Crime(Base):
    __tablename__ = "crimes"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True)
    description = Column(String)
    location = Column(String)
    suspect_name = Column(String)
    date_time = Column(DateTime)
    latitude = Column(Float)
    longitude = Column(Float)
```

## 设置 Robyn 应用程序

蝙蝠侠建立了一个 Robyn 应用程序并将其配置为使用数据库会话访问 SQLite 数据库。

基于数据库模型，蝙蝠侠创建了一些辅助方法来与数据库交互。这些方法将被端点用于对数据库执行 CRUD 操作。

```py
# crud.py
from sqlalchemy.orm import Session
from .models import  Crime


def get_crime(db: Session, crime_id: int):
    return db.query(Crime).filter(Crime.id == crime_id).first()

def get_crimes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Crime).offset(skip).limit(limit).all()

def create_crime(db: Session, crime):
    db_crime = Crime(**crime)
    db.add(db_crime)
    db.commit()
    db.refresh(db_crime)
    return db_crime

def update_crime(db: Session, crime_id: int, crime):
    db_crime = get_crime(db, crime_id)
    if db_crime is None:
        return None
    for key, value in crime.items():
        setattr(db_crime, key, value)
    db.commit()
    db.refresh(db_crime)
    return db_crime

def delete_crime(db: Session, crime_id: int):
    db_crime = get_crime(db, crime_id)
    if db_crime is None:
        return False
    db.delete(db_crime)
    db.commit()
    return True
```

## 犯罪数据端点

蝙蝠侠创建了各种端点来管理犯罪数据。这些端点允许哥谭市警察局添加、更新和检索犯罪数据。

```py
# __main__.py
from robyn import Robyn
from robyn.robyn import Request, Response
from sqlalchemy.orm import Session

app = Robyn(__file__)

@app.post("/crimes")
async def add_crime(request):
    with SessionLocal() as db:
        crime = request.json()
        insertion = crud.create_crime(db, crime)

    if insertion is None:
        raise Exception("Crime not added")

    return {
        "description": "Crime added successfully",
        "status_code": 200,
    }

@app.get("/crimes")
async def get_crimes(request):
    with SessionLocal() as db:
        skip = request.query_params.get("skip", "0")
        limit = request.query_params.get("limit", "100")
        crimes = crud.get_crimes(db, skip=skip, limit=limit)

    return crimes

@app.get("/crimes/:crime_id", auth_required=True)
async def get_crime(request):
    crime_id = int(request.path_params.get("crime_id"))
    with SessionLocal() as db:
        crime = crud.get_crime(db, crime_id=crime_id)

    if crime is None:
        raise Exception("Crime not found")

    return crime

@app.put("/crimes/:crime_id")
async def update_crime(request):
    crime = request.json()
    crime_id = int(request.path_params.get("crime_id"))
    with SessionLocal() as db:
        updated_crime = crud.update_crime(db, crime_id=crime_id, crime=crime)
    if updated_crime is None:
        raise Exception("Crime not found")
    return updated_crime

@app.delete("/crimes/{crime_id}")
async def delete_crime(request):
    crime_id = int(request.path_params.get("crime_id"))
    with SessionLocal() as db:
        success = crud.delete_crime(db, crime_id=crime_id)
    if not success:
        raise Exception("Crime not found")
    return {"message": "Crime deleted successfully"}
```
