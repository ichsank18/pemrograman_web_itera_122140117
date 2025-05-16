def includeme(config):
    config.add_route('matakuliah_list', '/matakuliah')
    config.add_route('matakuliah_detail', '/matakuliah/{id}')
    config.add_route('matakuliah_create', '/matakuliah')
    config.add_route('matakuliah_update', '/matakuliah/{id}')
    config.add_route('matakuliah_delete', '/matakuliah/{id}')
