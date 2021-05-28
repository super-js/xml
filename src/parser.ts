import {Parser} from "xml2js";

export type FilterFunction = (value: any) => boolean;

export interface IParseOptions {
    bufferEncoding?: BufferEncoding;
    withRootElement?: boolean;
    filter?: {[attributeNamePath: string]: FilterFunction};
}

export type ParseInput = Buffer | string | Buffer[] | string[];

export class XmlParser {

    constructor() {

    }

    static inputBufferToString(bufferInput: Buffer, encoding?: BufferEncoding): string {
        return bufferInput.toString(encoding);
    }

    async parse<T>(input: ParseInput, options?: IParseOptions): Promise<T> {

        const {
            bufferEncoding = 'utf-8',
            withRootElement = false
        } = options || {};

        if(Array.isArray(input)) {
            const parsedXmls = await Promise.all(input.map(i => this.parse<T>(i, options)));

            return parsedXmls as any;

        } else {
            const inputString = Buffer.isBuffer(input) ? XmlParser.inputBufferToString(input, bufferEncoding) : input;

            const xml2jsParser = new Parser({
                explicitRoot: withRootElement,
                explicitArray: false,
                trim: true,
                mergeAttrs: true
            });

            const parsedXml = await xml2jsParser.parseStringPromise(inputString);

            return parsedXml;
        }
    }

}