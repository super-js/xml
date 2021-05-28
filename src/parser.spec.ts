import {XmlParser} from "./parser";
import fs from "fs";

describe("XmlParser", () => {
    it("should create new XmlParser instance", () => {
        expect(new XmlParser()).toBeInstanceOf(XmlParser);
    });

    it("should parse single XML string", async() => {
        const xmlParser = new XmlParser();
        const obj = await xmlParser.parse<{xmlString: string}>('<xmlString>Xml String</xmlString>');

        expect(typeof obj === "object" && typeof obj.xmlString === "string").toBeTruthy();
    });

    it("should parse single XML Buffer", async() => {
        const xmlParser = new XmlParser();

        const xmlFile = fs.readFileSync('FILE');

        const obj = await xmlParser.parse<any>(xmlFile);

        expect(typeof obj === "object").toBeTruthy();
    });
})