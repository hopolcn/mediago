import { inject, injectable } from "inversify";
import { type Controller } from "../interfaces.ts";
import { ConfigParams, TYPES } from "../types.ts";
import FavoriteRepository from "../repository/FavoriteRepository.ts";
import { get, post } from "../helper/decorator.ts";
import Logger from "../vendor/Logger.ts";
import ConfigService from "../services/ConfigService.ts";
import { Context } from "koa";

@injectable()
export default class HomeController implements Controller {
  constructor(
    @inject(TYPES.FavoriteRepository)
    private readonly favoriteRepository: FavoriteRepository,
    @inject(TYPES.Logger)
    private readonly logger: Logger,
    @inject(TYPES.ConfigService)
    private readonly config: ConfigService,
  ) {}

  @get("/")
  async getFavorites() {
    return false;
  }

  @post("get-app-store")
  async getAppStore() {
    const store = await this.config.getConfig();
    return store;
  }

  @post("set-app-store")
  async setAppStore(ctx: Context) {
    const params = ctx.request.body as ConfigParams;
    this.config.setConfig(params);
    this.logger.info("set app store");
    return false;
  }
}
