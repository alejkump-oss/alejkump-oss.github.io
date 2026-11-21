# Original procedural background music (made by us, no third-party samples) -> no licence issues.
import numpy as np, wave, sys
SR=44100
def note(f,d,amp=0.2,shape='saw'):
    t=np.arange(int(SR*d))/SR
    if shape=='sine': w=np.sin(2*np.pi*f*t)
    elif shape=='tri': w=2*np.abs(2*((f*t)%1)-1)-1
    else:
        w=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,6))*0.6
    env=np.minimum(1,t/0.01)*np.exp(-t*2.5)
    return w*env*amp
def kick(d):
    t=np.arange(int(SR*d))/SR; f=110*np.exp(-t*25)+45
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)*0.9
def hat(d):
    t=np.arange(int(SR*d))/SR; return np.random.randn(len(t))*np.exp(-t*60)*0.12
def track(bpm,prog,shape,seed,dur=24):
    np.random.seed(seed); beat=60/bpm; out=np.zeros(int(SR*dur)+SR*6)
    n=int(dur/beat)
    for i in range(n):
        s=int(i*beat*SR); ch=prog[(i//4)%len(prog)]
        if i%2==0: k=kick(beat); out[s:s+len(k)]+=k
        h=hat(beat/2); s2=s+int(beat/2*SR); out[s2:s2+len(h)]+=h
        b=note(ch[0]/2,beat*0.9,0.25,'sine'); out[s:s+len(b)]+=b
        if i%4==0:
            for f in ch: p=note(f,beat*4,0.07,shape); out[s:s+len(p)]+=p
        m=note(ch[(i*7+seed)%3]*2,beat*0.45,0.06,'tri'); out[s:s+len(m)]+=m
    out=out[:int(SR*dur)]; out/=np.max(np.abs(out))*1.25
    fade=int(SR*1.5); out[-fade:]*=np.linspace(1,0,fade)
    return out
A=[(220,277.2,329.6),(185,233.1,277.2),(246.9,311.1,370),(164.8,207.7,246.9)]
C=[(261.6,329.6,392),(220,261.6,329.6),(174.6,220,261.6),(196,246.9,293.7)]
D=[(293.7,349.2,440),(233.1,293.7,349.2),(261.6,329.6,392),(220,277.2,329.6)]
specs=[('m1-upbeat',118,C,'saw',1),('m2-chill',92,A,'tri',2),('m3-drive',126,D,'saw',3),('m4-warm',100,C,'sine',4),('m5-bright',112,D,'tri',5),('m6-groove',104,A,'saw',6)]
for name,bpm,prog,shape,seed in specs:
    x=(track(bpm,prog,shape,seed)*32767*0.8).astype(np.int16)
    with wave.open(name+'.wav','w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(x.tobytes())
print('ok')
