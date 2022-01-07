import { FakeApplicationGateways } from "../../domain/ports/ApplicationGateways";
import { FakeApplicationRepositories } from "../../domain/ports/ApplicationRepositories";

export class FakeApplication {
    constructor(
        public gateways:FakeApplicationGateways,
        public repositories:FakeApplicationRepositories
    ) { }
}


