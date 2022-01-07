import { PlayerCleave } from "../../entities/PlayerCleave";
import { feature, scenario } from "../../tests/testSuites";
import { theChatGatewaySendMessageToPlayer, theEventIsSent, whenEventOccurs } from "../../tests/unitTests";
import { applicationMessagePrefix } from "../../entities/applicationMessagePrefix";
import { AuthorizedMessage } from "../../entities/AuthorizedMessage";
import { PlayerMessageEvent } from "./PlayerMessageEvent";
import { Gherkin } from "../../tests/Gherkin";
import { PlayerCleaveEvent } from "../playerCleave/PlayerCleaveEvent";
import { MessageForPlayer } from "../../entities/MessageForPlayer";
import { dontKnowWhatToDoWithThatMessage } from "../../entities/dontKnowWhatToDoWithThatMessage";
import { player } from "../../tests/testContexts";

feature(new PlayerMessageEvent(PlayerCleave.LEFT,player),[
    scenario(`Scenario 1 : ${applicationMessagePrefix+AuthorizedMessage.LEFT}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(applicationMessagePrefix+AuthorizedMessage.LEFT,player)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event,new PlayerCleaveEvent(PlayerCleave.LEFT,player) )
    ]),
    scenario(`Scenario 2 : ${applicationMessagePrefix+AuthorizedMessage.RIGHT}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(applicationMessagePrefix+AuthorizedMessage.RIGHT,player)),
        application => theEventIsSent(Gherkin.THEN, application.gateways.event,new PlayerCleaveEvent(PlayerCleave.RIGHT,player) )
    ]),
    scenario(`Scenario 3 : ${applicationMessagePrefix+AuthorizedMessage.UNSUPPORTED}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(applicationMessagePrefix+AuthorizedMessage.UNSUPPORTED,player)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN,application.gateways.chat,new MessageForPlayer(player,dontKnowWhatToDoWithThatMessage(player)))
    ]),
    scenario(`Scenario 4 : ${AuthorizedMessage.UNSUPPORTED}`, [
        application => whenEventOccurs(application.gateways.event, new PlayerMessageEvent(AuthorizedMessage.UNSUPPORTED,player)),
        application => theChatGatewaySendMessageToPlayer(Gherkin.THEN,application.gateways.chat,[])
    ]),
])


