from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from pyramid.config import Configurator
import zope.sqlalchemy

from .models.meta import Base

def main(global_config, **settings):
    config = Configurator(settings=settings)

    config.include('pyramid_tm')

    # Set up DB
    engine = engine_from_config(settings, 'sqlalchemy.')
    session_factory = sessionmaker(bind=engine)
    config.registry['dbsession_factory'] = session_factory

    def dbsession(request):
        dbsession = session_factory()
        zope.sqlalchemy.register(dbsession, transaction_manager=request.tm)
        return dbsession

    config.add_request_method(dbsession, 'dbsession', reify=True)

    # Include route + view
    config.include('pyramid_tm')
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')
    config.include('.views.matakuliah')
    config.include('.views.matakuliah')
    config.add_route('home', '/')
    config.scan()
    config.include('.views.matakuliah')

    return config.make_wsgi_app()
