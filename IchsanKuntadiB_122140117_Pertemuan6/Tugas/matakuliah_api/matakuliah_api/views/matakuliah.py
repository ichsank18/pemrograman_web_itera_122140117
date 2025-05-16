from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models.matakuliah import Matakuliah

def includeme(config):
    config.scan(__name__)

@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def matakuliah_list(request):
    matakuliahs = request.dbsession.query(Matakuliah).all()
    return {'data': [dict(
        id=m.id,
        kode_mk=m.kode_mk,
        nama_mk=m.nama_mk,
        sks=m.sks,
        semester=m.semester
    ) for m in matakuliahs]}


@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def matakuliah_detail(request):
    id = request.matchdict.get('id')
    matkul = request.dbsession.query(Matakuliah).get(id)
    if not matkul:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    return {'data': dict(
        id=matkul.id,
        kode_mk=matkul.kode_mk,
        nama_mk=matkul.nama_mk,
        sks=matkul.sks,
        semester=matkul.semester
    )}


@view_config(route_name='matakuliah_create', renderer='json', request_method='POST')
def matakuliah_create(request):
    data = request.json_body
    required = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required:
        if field not in data:
            return HTTPBadRequest(json_body={'error': f'{field} wajib diisi'})
    
    matkul = Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=int(data['sks']),
        semester=int(data['semester']),
    )
    request.dbsession.add(matkul)
    return {'message': 'Matakuliah berhasil ditambahkan'}


@view_config(route_name='matakuliah_update', renderer='json', request_method='PUT')
def matakuliah_update(request):
    id = request.matchdict.get('id')
    matkul = request.dbsession.query(Matakuliah).get(id)
    if not matkul:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    data = request.json_body
    for field in ['kode_mk', 'nama_mk', 'sks', 'semester']:
        if field in data:
            setattr(matkul, field, data[field])
    
    return {'message': 'Matakuliah berhasil diperbarui'}


@view_config(route_name='matakuliah_delete', renderer='json', request_method='DELETE')
def matakuliah_delete(request):
    id = request.matchdict.get('id')
    matkul = request.dbsession.query(Matakuliah).get(id)
    if not matkul:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    request.dbsession.delete(matkul)
    return {'message': 'Matakuliah berhasil dihapus'}
