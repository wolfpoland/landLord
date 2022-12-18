import { prisma } from '../../db/client';
import { protectedProcedure, router } from '../trpc';

import { Apartment, Maintainer, Owner, User } from '@prisma/client';
import superjson from 'superjson';
import { z } from 'zod';

export const apartment = router({
  addApartment: protectedProcedure
    .input(z.object({ name: z.string(), address: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.session?.user;
      let owner: Owner | null = null;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          owner: true,
        },
      });

      if (user?.owner) {
        owner = user?.owner;
      }

      if (!user) {
        throw new Error('User not found');
      }

      console.log('user', user);

      if (!user.owner) {
        console.log('no owner', user.owner);

        owner = await ctx.prisma.owner.create({
          data: {
            userId: id,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id,
          },
          data: {
            owner: {
              connect: {
                id: owner.id,
              },
            },
          },
        });
      }

      if (!owner) {
        throw new Error('Owner not found');
      }

      console.log('gonna create', owner);

      return await ctx.prisma.apartment.create({
        data: {
          name: input.name,
          address: input.address,
          ownerId: owner.id,
        },
      });
    }),
  getApartments: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session?.user;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.owner) {
      throw new Error('Owner not found');
    }

    console.log('user', user);

    const apartments = await ctx.prisma.apartment.findMany({
      where: {
        ownerId: user.owner.id,
      },
    });

    console.log('apartments', apartments);

    return apartments;
  }),
  getApartment: protectedProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ input }) => {
      if (!input.id) {
        throw new Error('Apartment id is required');
      }

      return getUniqueApartment(input?.id);
    }),
});

export type GetUniqueApartmentTuple = [
  Apartment,
  (Owner & { user: User }) | undefined,
  (Maintainer & { user: User }) | undefined
];

export const getUniqueApartment = async (id: string) => {
  let owner: (Owner & { user: User }) | null = null;
  let maintainer: (Maintainer & { user: User }) | null = null;

  if (!id) {
    throw new Error('Please provide an apartment id');
  }

  if (!prisma) {
    throw new Error('Prisma client not found');
  }

  const apartment = await prisma.apartment.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: true,
      maintainer: true,
    },
  });

  if (!apartment) {
    throw new Error('Apartment not found');
  }

  const _owner = await prisma.owner.findUnique({
    where: {
      id: apartment?.ownerId,
    },
    include: {
      user: true,
    },
  });

  if (_owner) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete _owner.user.hash;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete _owner.user.emailVerified;

    owner = _owner;
  }

  if (apartment?.maintainerId) {
    const _maintainer = await prisma.maintainer.findUnique({
      where: {
        id: apartment?.maintainerId,
      },
      include: {
        user: true,
      },
    });

    maintainer = _maintainer;
  }

  console.log('apartment', apartment);

  const response: GetUniqueApartmentTuple = [apartment, undefined, undefined];

  if (owner) {
    response[1] = owner;
  }

  if (maintainer) {
    response[2] = maintainer;
  }

  console.log('response', response);
  return superjson.stringify(response);
};
