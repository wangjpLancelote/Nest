import { Path } from '@angular-devkit/core';
import { ModuleImportDeclarator } from './module-import.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';
export interface DeclarationOptions {
    metadata: string;
    type?: string;
    name: string;
    path: Path;
    module: Path;
    symbol?: string;
}
export declare class ModuleDeclarator {
    private imports;
    private metadata;
    constructor(imports?: ModuleImportDeclarator, metadata?: ModuleMetadataDeclarator);
    declare(content: string, options: DeclarationOptions): string;
    private computeSymbol;
}
