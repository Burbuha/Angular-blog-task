import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const posts = [
      {
        id: 1,
        title: 'My first post',
        post:
          'Today, the Sahara is the largest warm desert on Earth, spreading from the Atlantic to the Red Sea — an area bigger than the continental US. And it’s advancing. For the communities that live in the Sahel — a thin strip of hope bordering the desert’s southern edge — livelihoods and futures are under an all-out assault. For centuries, the Sahel — meaning coast in Arabic — was the breadbasket of the African civilisations that thrived on the desert caravans, which sailed across the sands like ships on the ocean. From Wagadu, the Mali and Songhai Empires, and the Horse-lords of the Mossi Kingdoms in the west, through to the ancient Aksumite Dynasties in the east. But their success was reliant on the fragile grasslands and scattered trees.',
      },
      {
        id: 2,
        title: 'Africa is Planting Tens of Millions of Trees in the Desert.',
        post:
          'In the dusty, windswept lands of Niger, there once stood a lonely acacia tree. Caravans passed beneath its spiky branches — the last stop before the endless sea of sand. Known as the Tree of Ténéré it was the only one for hundreds of miles — the loneliest tree on Earth. But it was also a reminder of a long-forgotten time when the Sahara teemed with life. Beautifully painted prehistoric rock art tells of a panoply of hippos, rhinos, elephants, giraffes and antelopes. For millennia they thrived in a land of oceanic lakes and thundering rivers. That was 6,000 years ago.',
      },
      {
        id: 3,
        title: 'Africa is Planting Tens of Millions of Trees in the Desert.',
        post:
          'Climate change and centuries of overgrazing are decimating the Sahel. Bordering the desert, an estimated 500 million people live on land undergoing desertification. If we do nothing, people will move. The ensuing refugee crisis will be biblical, making the mass migrations of the past decades seem quaint by comparison. Already farmers and pastoralists abandon their ancestral lands, as millions of Ethiopians are pushed into food insecurity by drought.',
      },
      {
        id: 4,
        title: 'Africa',
        post:
          'Climate change and centuries of overgrazing are decimating the Sahel. Bordering the desert, an estimated 500 million people live on land undergoing desertification. If we do nothing, people will move. The ensuing refugee crisis will be biblical, making the mass migrations of the past decades seem quaint by comparison. Already farmers and pastoralists abandon their ancestral lands, as millions of Ethiopians are pushed into food insecurity by drought.',
      },
    ];
    return { posts };
  }

  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
  }

}
