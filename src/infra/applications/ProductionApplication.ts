import { ProductionApplicationGateways } from "../../domain/ports/ApplicationGateways";
import { ProductionApplicationRepositories } from "../../domain/ports/ApplicationRepositories";


export class ProductionApplication {
    constructor(
        public gateways: ProductionApplicationGateways,
        public repositories: ProductionApplicationRepositories
    ) { }
}
