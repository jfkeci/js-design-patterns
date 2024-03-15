# Adapter Caching

Sometimes the adapter design pattern causes you to generate temporary objects and if it does it makes sense to try to cut down on the number of objects you are trying to generate.
If you are generating temporary objects for objects that you have alredy encountered before it might make sense to put them into some sort of cache.
And then all you have to do is have some sort of unique value for the cached value.