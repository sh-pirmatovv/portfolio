from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="PORTFOLIO_")

    app_name: str = "Shahzodbek Premium Ecosystem API"
    admin_username: str = "operator"
    admin_password: str = "watchmaker"
    environment: str = "development"
    demo_mode: bool = True
    heartbeat_ttl_seconds: int = 300
    event_history_limit: int = 50
    session_ttl_seconds: int = 60 * 60 * 8
    database_url: str = "postgresql+psycopg://portfolio:portfolio@localhost:5432/portfolio"
    redis_url: str = "redis://localhost:6379/0"
    allow_insecure_internal_routes: bool = True


settings = Settings()
