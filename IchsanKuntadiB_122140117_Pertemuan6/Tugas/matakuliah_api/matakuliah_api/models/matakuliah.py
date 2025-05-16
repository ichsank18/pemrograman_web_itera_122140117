from sqlalchemy import Column, Integer, String
from .meta import Base

class Matakuliah(Base):
    __tablename__ = 'matakuliah'
    id = Column(Integer, primary_key=True)
    kode_mk = Column(String, unique=True)
    nama_mk = Column(String)
    sks = Column(Integer)
    semester = Column(Integer)
