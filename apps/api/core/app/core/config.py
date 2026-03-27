from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="PORTFOLIO_")

    app_name: str = "Shahzodbek Premium Ecosystem API"
    admin_username: str = "operator"
    admin_password: str = "watchmaker"


settings = Settings()

