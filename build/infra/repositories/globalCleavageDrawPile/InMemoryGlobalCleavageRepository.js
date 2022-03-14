"use strict";
exports.__esModule = true;
exports.globalCleavages = exports.InMemoryGlobalCleavageDrawPileRepository = void 0;
var Choice_1 = require("../../../domain/entities/Choice");
var Cleavage_1 = require("../../../domain/entities/Cleavage");
var InMemoryGlobalCleavageDrawPileRepository = /** @class */ (function () {
    function InMemoryGlobalCleavageDrawPileRepository(cleavagesDrawPile) {
        if (cleavagesDrawPile === void 0) { cleavagesDrawPile = []; }
        this.cleavagesDrawPile = cleavagesDrawPile;
    }
    InMemoryGlobalCleavageDrawPileRepository.prototype.retrieveGlobalCleavageByIndex = function (cleavageIndex) {
        var cleavage = this.cleavagesDrawPile[cleavageIndex];
        return cleavage ? Promise.resolve(cleavage) : Promise.reject(new Error("No cleavage at index ".concat(cleavageIndex)));
    };
    InMemoryGlobalCleavageDrawPileRepository.prototype.globalCleavageQuantity = function () {
        return Promise.resolve(this.cleavagesDrawPile.length);
    };
    InMemoryGlobalCleavageDrawPileRepository.prototype.save = function (cleavage) {
        this.cleavagesDrawPile.push(cleavage);
        return Promise.resolve();
    };
    InMemoryGlobalCleavageDrawPileRepository.prototype.hasCleavage = function (cleavage) {
        return Promise.resolve(this.cleavagesDrawPile.some(function (globalCleavage) { return globalCleavage.title === cleavage.title; }));
    };
    return InMemoryGlobalCleavageDrawPileRepository;
}());
exports.InMemoryGlobalCleavageDrawPileRepository = InMemoryGlobalCleavageDrawPileRepository;
var defaultLeftChoice = new Choice_1.Choice({ name: 'Gôche', players: [] });
var defaultRightChoice = new Choice_1.Choice({ name: 'Drouate', players: [] });
exports.globalCleavages = [
    "Emmanuel Macron au PMU avec un p'tit blanc",
    'Un infirmier après son augmentation annuelle',
    "Le manager de l'équipe après s'être fait allumé par le CODIR",
    'Le vieux monsieur après 4 runs foirées sur Isaac',
    'Le prof de français en 5ème',
    'Pépé', 'Papy',
    'Mémé', 'Mamie',
    'Papa', 'Maman',
    "Ton mec une fois que tu l'as bien gonflé",
    "Ta meuf une fois que tu l'as énervé",
    "Toi quand ta meuf t'a énervé",
    'Ton enfant qui commande son plat au resto',
    'Gainsbourg',
    'Coluche',
    'Les concombres à la crème',
    'La raclette entre potes à la montagne en février',
    'Le maitre nageur à la piscine',
    'Le DRH',
    'Le stagiaire',
    "Robert Hue devant son relevé d'impots",
    'Les blues brothers (dans le premier film)',
    'Les fourmis',
    'Une mercedes',
    'Une renault',
    'Bernard Arnaud qui donne 10 balles à un SDF',
    'Le chat',
    'La choucroute',
    'La Suisse',
    'La Belgique',
    'Le service en porcelaine de belle maman',
    'Le cousin chiant',
    'Le tonton chiant',
    'La Gameboy'
].map(function (title) { return new Cleavage_1.Cleavage({ title: title, leftChoice: defaultLeftChoice.toDTO(), rightChoice: defaultRightChoice.toDTO(), players: [] }); });
