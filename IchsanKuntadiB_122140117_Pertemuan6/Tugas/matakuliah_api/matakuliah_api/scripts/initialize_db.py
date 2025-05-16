import os
import sys
import transaction

from sqlalchemy import engine_from_config

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)

from ..models import (
    get_engine,
    get_session_factory,
    get_tm_session,
    Base,
)


def usage(argv):
    cmd = os.path.basename(argv[0])
    print(f'usage: {cmd} <config_uri>\n'
          f'(example: "{cmd} development.ini")')
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    engine = get_engine(settings)
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)
    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)
        # Tambahkan data awal jika ingin
        # contoh:
        # from ..models.matakuliah import Matakuliah
        # dbsession.add(Matakuliah(kode_mk="IF101", nama_mk="Dasar Pemrograman", sks=3, semester=1))
