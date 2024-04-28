export const hsl = /*glsl*/ `
float lum(vec3 c) {
    return (0.3f * c.r + 0.59f * c.g + 0.11f * c.b);
}

vec3 clipColor(vec3 c) {
    float l = lum(c);
    float n = min(min(c.r, c.g), c.b);
    float x = max(max(c.r, c.g), c.b);

    if(n < 0.0f) {
        return l + (((c - l) * l) / (l - n));
    };

    if(x > 1.0f) {
        return l + (((c - l) * (1.0f - l)) / (x - l));
    };

    return c;
}

vec3 setLum(vec3 c, float l) {
    vec3 color;
    float d = l - lum(c);

    color.r = c.r + d;
    color.g = c.g + d;
    color.b = c.b + d;

    return clipColor(color);
}

float sat(vec3 c) {
    return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
}

vec3 setSat(vec3 c, float s) {
    int min = (c.x < c.y && c.x < c.z) ? 0 : (c.y < c.z) ? 1 : 2;
    int max = (c.x > c.y && c.x > c.z) ? 0 : (c.y > c.z) ? 1 : 2;
    int mid = 3 - min - max;

    if(c[max] > c[min]) {
        c[mid] = (((c[mid] - c[min]) * s) / (c[max] - c[min]));
        c[max] = s;
    } else {
        c[mid] = c[max] = 0.f;
    }

    c[min] = 0.0f;

    return c;
}
`
