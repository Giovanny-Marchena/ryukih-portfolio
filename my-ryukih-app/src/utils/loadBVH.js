// src/utils/loadBVH.js
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader';

export function loadBVH(path, onLoad, onError) {
    const loader = new BVHLoader();
    loader.load(path, onLoad, undefined, onError);
}