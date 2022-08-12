<?php

namespace ClarkWinkelmann\SelectiveMediaEmbed;

use Flarum\Frontend\Document;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use s9e\TextFormatter\Plugins\MediaEmbed\Configurator\Collections\CachedDefinitionCollection;

class AdminPayload
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        $sites = new CachedDefinitionCollection();

        $array = $sites->asConfig();

        $document->payload['mediaEmbedSites'] = array_map(function ($site, $id) {
            return [
                'id' => $id,
                'name' => Arr::get($site, 'name'),
                'example' => Arr::get($site, 'example'),
            ];
        }, $array, array_keys($array));
    }
}
