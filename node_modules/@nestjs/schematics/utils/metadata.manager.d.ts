export declare class MetadataManager {
    private content;
    constructor(content: string);
    insert(metadata: string, symbol: string): string;
    private getDecoratorMetadata;
    private getSourceNodes;
    private insertMetadataToEmptyModuleDecorator;
    private insertNewMetadataToDecorator;
    private insertSymbolToMetadata;
}
